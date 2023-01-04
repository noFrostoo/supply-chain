<template>
    <ion-page>
    <ion-content :fullscreen="true">
      <form>
      <ion-grid class="container" >
        <ion-col>
          <ion-row class="grid-item">
              <h1> Supply Chain </h1>
          </ion-row>
          <br/>
          <ion-row class="grid-item">
            <ion-input id="login" shape="round" placeholder="Username" v-model="username" @ionInput="validateUsername"></ion-input>
          </ion-row>
          <ion-row class="grid-item" >
            <ion-note v-if="!validUserName && username != null">Invalid username</ion-note>
          </ion-row>
          <br/>
          <ion-row class="grid-item">
              <ion-input id="password" shape="round" type="password" placeholder="Password" v-model="password" @ionInput="validatePassword"></ion-input>
          </ion-row>
          <ion-row class="grid-item" >
            <ion-note v-if="!validPassword && password != null">Invalid password</ion-note>
          </ion-row>
          <br/>
          <ion-row class="grid-item">
            <ion-button fill="outline" shape="round" @click="signUp">Sign Up</ion-button>
            <ion-button :disable="!validUserName && !validPassword " shape="round" @click="checkLogin">Sign In</ion-button>
          </ion-row>
          <ion-row class="grid-item">
            <ion-button fill="outline" shape="round">Quick Connect</ion-button>
          </ion-row>
        </ion-col>
      </ion-grid>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { useIonRouter } from '@ionic/vue';
import {IonButton, IonNote, IonPage ,IonContent, IonInput, IonGrid, IonRow, IonCol } from '@ionic/vue';

export default {
  name: 'LoginPage',
  components: {
      IonButton,
      IonContent, 
      IonGrid,
      IonRow,
      IonCol,
      IonNote,
      IonInput,
      IonPage
    },
  data() {
    return {
      username: null,
      password: null,
      validUserName: false,
      validPassword: false,
      router: useIonRouter()
    }
  },
  methods: {
    async checkLogin() {
      let payload = {
        username: this.username,
        password: this.password,
      }
      await this.$store.dispatch("actionLogIn", payload);
      
      if (this.$store.getters["isLoggedIn"]) {
        this.acceptLogin();
      }
      else {
        this.rejectLogin();
      }
    },
    async signUp() {
      let payload = {
        username: this.username,
        password: this.password,
      }

      await this.$store.dispatch("actionRegister", payload);
      if (this.$store.getters["registrationError"]) return;

      await this.$store.dispatch("actionLogIn", payload);
      
      if (this.$store.getters["isLoggedIn"]) {
        this.acceptLogin();
      }
      else {
        this.rejectLogin();
      }
    },
    acceptLogin() {
      console.log('Logowanie powiodło się');
      this.router.push(`/home`)
    },
    rejectLogin() {
      this.email=null;
      this.password=null;
      console.log('Logowanie nie powiodło się');
      alert("Niepoprawny login");
    },
    validateUsername(ev) {
      this.username = ev.target.value;

      console.log(this.username)
      if (this.username != "") {
        this.validUserName = true
      }
      else {
        this.validUserName = false
      } 
    },
    validatePassword(ev) {
      this.password = ev.target.value;

      console.log(this.password)
      if (this.password != "" ) {
        this.validPassword = true
      }
      else {
        this.validPassword = false
      } 
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
}

#login {
  text-align: center;
  border-radius: 25px;
  background: #eb445a;
  padding: 15px;
  min-width: 50%;
  max-width: 70%;
}

#password {
  text-align: center;
  border-radius: 25px;
  background: #eb445a;
  padding: 15px;
  min-width: 50%;
  max-width: 70%;
}

</style>