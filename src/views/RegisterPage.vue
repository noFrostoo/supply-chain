<template>
    <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header> 
      <form>
      <ion-grid class="container" >
        
        <ion-col>
          <ion-row class="item">
              <h3> Login </h3>
          </ion-row>
          <br/>
          <ion-row class="item">
              <ion-input id="login" placeholder="Username"></ion-input>
          </ion-row>
          <br/>
          <ion-row class="item">
              <ion-input id="password" type="password" placeholder="Password"></ion-input>
          </ion-row>
          <br/>
          <ion-row class="item">
            <ion-button @click="presentLoading">Login</ion-button>
          </ion-row>
        </ion-col>
      </ion-grid>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
export default {

}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

#login {
  text-align: center;
  border-radius: 25px;
  background: #eb445a;
  padding: 20px;
  min-width: 50%;
  max-width: 70%;
}

#password {
  text-align: center;
  border-radius: 25px;
  background: #eb445a;
  padding: 20px;
  min-width: 50%;
  max-width: 70%;

}

</style>