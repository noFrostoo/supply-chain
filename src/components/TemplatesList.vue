<template>
    <ion-content fullscreen role="feed">
        <ion-list id="template-list">
        <ion-item
            v-for="item in templates"
            :key="item"
            role="article"
        >
            <ion-label>{{item.name}}</ion-label>
            <ion-button @click="editTemplate(item.id)">Edit</ion-button>
            <ion-button>Create Lobby</ion-button>
            <ion-button @click="deleteTemplate(item.id)">Delete</ion-button>
        </ion-item>
        </ion-list>

    </ion-content>
</template>

<script lang="js">
  import {IonButton, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonList, IonItem } from '@ionic/vue';
  import {ref} from "vue";
  import { useIonRouter } from '@ionic/vue';

  export default {
    components: {
      IonButton,
      IonContent, 
      IonItem,
      IonLabel,
      IonList,
    },
    name: "TemplatesList",
    props: ["templates", "deleteTemplate"],
    methods: {
      async editTemplate(id){
        await this.$store.dispatch("fetchTemplate", id)
        this.router.push(`/template/${id}/Settings`)
      },
    },
    data() {
      return{ 
        router: useIonRouter()
      }
    },
  }
</script>

<style scoped>

</style>