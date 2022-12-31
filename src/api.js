import { default as Axios } from 'axios';
import { API_URL } from "./config";

const axios = Axios.create({
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
  baseURL: API_URL
});


function authHeaders(token) {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

const APISUFFIX = ""

export const api = {
  async logIn(username, password) {
    console.log("sending log request")

    let payload = {
        username: username,
        password: password
    }

    return axios.post(`${APISUFFIX}/authorize`, payload);
  },

  async register(username, password) {
    console.log("sending register request")

    let payload = {
        username: username,
        password: password,
        role: "User"
    }

    return axios.post(`${APISUFFIX}/register`, payload);
  },

  async getMe(token) {
    return axios.get(`${APISUFFIX}/users/me`, authHeaders(token));
  },

  async updateMe(token, data) {
    return axios.put(`${APISUFFIX}/users/me`, data, authHeaders(token));
  },

  async getUsers(token) {
    let config = authHeaders(token);
    // if (params !== undefined) {
    //   config['params'] = params;
    // }
    return axios.get(`${APISUFFIX}/users`, config);
  },
  async getUser(token, id) {
    return axios.get(`${APISUFFIX}/users/${id}`, authHeaders(token));
  },

  async updateUser(token, userId, data) {
    return axios.put(`${APISUFFIX}/users/${userId}`, data, authHeaders(token));
  },

  async fetchTemplates(token) {
    return axios.get(`${APISUFFIX}/template`, authHeaders(token));
  },

  async fetchTemplate(token, id) {
    return axios.get(`${APISUFFIX}/template/${id}`, authHeaders(token));
  },

  async createTemplate(token, data) {
    return axios.post(`${APISUFFIX}/template`, data, authHeaders(token));
  },

  async modifyTemplate(token, id, data) {
    return axios.put(`${APISUFFIX}/template/${id}`, data, authHeaders(token));
  },

  async deleteTemplate(token, id) {
    return axios.delete(`${APISUFFIX}/template/${id}`, authHeaders(token));
  },

  async fetchLobbies(token, type, limit, offset) {
    return axios.get(`${APISUFFIX}/lobby?lobby_type=${type}&limit=${limit}&offset=${offset}`, authHeaders(token));
  },

  async fetchLobby(token, id) {
    return axios.get(`${APISUFFIX}/lobby/${id}`, authHeaders(token));
  },

  async createLobby(token, data) {
    return axios.post(`${APISUFFIX}/lobby`, data, authHeaders(token));
  },

  async modifyLobby(token, id, data) {
    return axios.put(`${APISUFFIX}/lobby/${id}`, data, authHeaders(token));
  },

  async deleteLobby(token, id) {
    return axios.delete(`${APISUFFIX}/lobby/${id}`, authHeaders(token));
  },

  async connect(token, userId, gameId, password=null) {
    if (password != null)
      return axios.put(`${APISUFFIX}/users/${userId}/connect?game_id=${gameId}&password=${password}`, null, authHeaders(token));
    return axios.put(`${APISUFFIX}/users/${userId}/connect?game_id=${gameId}`, null, authHeaders(token));
  },

  async startGame(token, id, classes) {
    axios.post(`${APISUFFIX}/lobby/${id}/start`, classes, authHeaders(token));
  }


};