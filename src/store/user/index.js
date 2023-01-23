import { api } from '@/api';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers, Storage } from '@ionic/storage';

const defaultState = {
    isLoggedIn: null,
    logInError: false,
    registrationError: false,
    registrationSuccess: false,
    token: '',
    id: null,
    username: null,
    userType: null,
    gameId: null,
};

export const actions = {
    async actionLogIn(context, payload) {
        try {
            console.log(payload)
            const response = await api.logIn(payload.username, payload.password)
            console.log("received request")
            const token = response.data.access_token;
            console.log("token", token);
            if (token) {
                await saveLocalToken(token);
                context.commit("setToken", token);
                context.commit("setLoggedIn", true)
                context.commit("setLogInError", false)
                await context.dispatch("actionGetMe");
            } else {
                await context.dispatch("actionLogOut");
            }
        } catch (err) {
            console.log(err)
            context.commit("setLoggedIn", false)
            context.commit("setLogInError", true)
            await context.dispatch("actionLogOut");
            await context.dispatch("alert", "Problem with sign in")
        }
    },

    async actionGetMe(context) {
        try {
            const response = await api.getMe(context.state.token)
            if (response.data) {
                setUserData(context, response.data)
                console.log("get me data", response.data)
            }
            return true;
        } catch (error) {
            await context.dispatch("actionCheckApiError", error);
            await context.dispatch("alert", "Problem with getting user data")
        }
        return false;
    },

    async actionCheckLoggedIn(context) {
        if (!context.state.isLoggedIn) {
            let token = context.state.token;
            if (!token) {
                const localToken = await getLocalToken();
                if (localToken) {
                    context.commit("setToken", localToken);
                    token = localToken;
                }
            }
            if (token) {
                try {
                    console.log("token", token)
                    const isLoggedIn = await context.dispatch("actionGetMe");
                    context.commit("setLoggedIn", isLoggedIn);
                    if (!isLoggedIn) {
                        await context.dispatch("actionLogOut");
                    }
                } catch (error) {
                    await context.dispatch("actionCheckApiError", error);
                    await context.dispatch("toast", "Not logged in");
                }
            } else {
                context.commit("setToken", '');
                context.commit("setLoggedIn", false);
                await context.dispatch("toast", "Not logged in");
            }
        }
    },

    async actionLogOut(context) {
        await removeLocalToken();
        context.commit("setToken", '');
        context.commit("setLoggedIn", false);
        await context.dispatch("alert", "Logged out");
    },

    async actionCheckApiError(context, payload) {
        if (payload.response.status === 401) {
            await context.dispatch("actionLogOut");
        }
        if (payload.response.status === 403) {
            await context.dispatch("actionLogOut");
        }
    },

    async actionUpdateMe(context, payload) {
        try {
            const response = await api.updateMe(context.state.token, payload);
            if (response.data) {
                setUserData(context, response.data)
            }
        } catch (error) {
            await context.dispatch("actionCheckApiError", error);
        }
    },

    async actionRegister(context, payload) {
        try {
            const response = await api.register(payload.username, payload.password)
            if (response.status == 200) {
                context.commit("setRegistrationError", false)
                context.commit("setRegistrationSuccess", true)
                console.log(response);
            } else {
                context.commit("setRegistrationError", true)
                context.commit("setRegistrationSuccess", false)
                console.log(response);
            }
        } catch (err) {
            context.commit("setRegistrationError", true)
            context.commit("setRegistrationSuccess", false)
            console.log(err);
            await context.dispatch("alert", "Problem with singing up");
        }
    },
}

export const getters = {
    loginError: (state) => state.logInError,
    token: (state) => state.token,
    isLoggedIn: (state) => state.isLoggedIn,
    username: (state) => state.username,
    userType: (state) => state.userType,
    gameId: (state) => state.game_id,
    id: (state) => state.id,
    user: (state) => {
        return {
            id: state.id,
            username: state.username,
            userType: state.userType,
            game_id: state.game_id
        }
    },
    registrationError: (state) => state.registrationError,
    registrationSuccess: (state) => state.registrationSuccess,
}

export const mutations = {
    setToken(state, payload) {
        state.token = payload;
    },
    setUsername(state, payload) {
        state.username = payload
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setLogInError(state, payload) {
        state.logInError = payload;
    },
    setRegistrationError(state, payload) {
        state.registrationError = payload;
    },
    setRegistrationSuccess(state, payload) {
        state.registrationSuccess = payload;
    },
    setUserType(state, payload) {
        state.userType = payload
    },
    resetRegistration(state) {
        state.registrationSuccess = false;
        state.registrationError = false;
    },
    setID(state, payload) {
        state.id = payload
    },
    setGameId(state, gameId) {
        state.gameId = gameId
    }
}

export const userModule = {
    state: defaultState,
    mutations,
    actions,
    getters,
};


const setUserData = (context, data) => {
    context.commit("setID", data.id)
    context.commit("setUsername", data.username);
    context.commit("setUserType", data.role);
    context.commit("setGameId", data.game_id)
}

const storage = new Storage({
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage, CordovaSQLiteDriver._driver,]
});

storage.create()

export const getLocalToken = async () => await storage.get('token');

const saveLocalToken = async (token) => await storage.set('token', token);

const removeLocalToken = async () => await storage.remove('token');