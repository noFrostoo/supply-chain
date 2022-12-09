<template>
    <ion-page>
      <MenuWidget/>
      <ion-page id="main-content" >
        <ion-header>
          <ion-toolbar>
            <ion-buttons  slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
            <ion-title>Control</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">Control</ion-title>
            </ion-toolbar>
          </ion-header>
          <div class="container">
            <ion-button v-if="isnewTemplate" @click="create" style="margin:5px" >Create</ion-button>
            <ion-button v-else style="margin:5px" @click="update" >Save</ion-button>
            <ion-button style="margin:5px" @click="createLobby">Create a lobby</ion-button>
            <ion-button v-if="!isnewTemplate" style="margin:5px" @click="deleteTemplate" >Delete</ion-button>
          </div>
        </ion-content>
      </ion-page>
    </ion-page>
  </template>
  
  <script lang="js">
  import { defineComponent } from 'vue';
  import { IonPage, IonButton,  IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import MenuWidget from '@/components/MenuWidget.vue';
  import { useIonRouter } from '@ionic/vue';

  export default defineComponent({
    name: 'ControlPage',
    components: { MenuWidget, IonButton, IonMenuButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    data() {
        return {
            isnewTemplate: this.$store.getters["isNewTemplate"],
            router: useIonRouter()
        }
    },
    methods: {
        async create() {
            let template = await this.$store.dispatch("createTemplate")
            this.router.push(`/template/${template.id}/Settings`)
        },
        async update() {
            let template = await this.$store.dispatch("updateTemplate")
        },
        async deleteTemplate() {
            let template = await this.$store.dispatch("updateTemplate")
        },
        async createLobby() {
            let template = await this.$store.dispatch("updateTemplate")
        },
        
    }
});
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%
  }
  </style>
  