<template>
  <ion-page>
    <MenuVue/>
    <ion-page id="main-content">
    <ion-content fullscreen scroll-y="false">
      <!-- <ion-header collapse="condense"> -->
      <ion-header>
        <ion-toolbar>
          <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>
            <ion-searchbar style="width: 50%" animated="true" placeholder="Template Name"></ion-searchbar>
          </ion-title>
        </ion-toolbar>
      </ion-header> 
      <TemplatesList :templates="templates" :deleteTemplate="deleteTemplate" />

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="addTemplate()">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    </ion-content>
    </ion-page>
  </ion-page>
</template>

<script lang="js">
  import {IonButton, IonIcon, IonFabButton, IonFab, IonPage, IonButtons, IonHeader, IonSearchbar, IonTitle, IonMenu, IonMenuButton,IonToolbar ,IonContent, IonItem, IonGrid, IonRow, IonCol } from '@ionic/vue';
  import TemplatesList from "../components/TemplatesList.vue"
  import MenuVue from '@/components/MenuWidget.vue';
  import { add } from 'ionicons/icons';
  import { useIonRouter } from '@ionic/vue';
  import { api } from '@/api';

  let templates = null

  export default {
    components: {
      MenuVue,
      IonContent, 
      IonToolbar,
      IonMenuButton,
      IonTitle,
      IonSearchbar,
      IonHeader,
      IonButtons,
      IonPage,
      TemplatesList,
      IonFabButton,
      IonFab,
      IonIcon,
    },
    methods: {
      addTemplate() {
        this.$store.commit("startCreatingTemplate")
        this.router.push("/template/new/Settings")
      },
      async deleteTemplate(id) {

        await this.fetchTemplates();
      },
      async fetchTemplates() {
        return await (await api.fetchTemplates(this.$store.getters["token"])).data
      },
    },
    data() {
      return {
        templates: [],
        add,
        router: useIonRouter(),
      }
    },
    async created() {
      this.templates = await (await api.fetchTemplates(this.$store.getters["token"])).data
      console.log(this.templates)
    },
  }
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

</style>