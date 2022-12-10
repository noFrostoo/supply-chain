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

        <ion-infinite-scroll threshold="200px" id="infinitescroll" @ionInfinite="loadData($event)" >
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
        </ion-infinite-scroll>
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
      IonInfiniteScroll, 
      IonInfiniteScrollContent,
      IonItem,
      IonLabel,
      IonList,
    },
    name: "TemplatesList",
    props: ["templates"],
    methods: {
      async editTemplate(id){
        await this.$store.dispatch("fetchTemplate", id)
        this.router.push(`/template/${id}/Settings`)
      },
      async deleteTemplate(id) {
        this.$store.dispatch("deleteTemplate", id)
        this.router.push(`/yourtemplates/`)
      }
    },
    data() {
      return{ 
        router: useIonRouter()
      }
    },
    created() {
      console.log("XDDD")
      let pageSize = 25

      const isDisabled = ref(false);
      const toggleInfiniteScroll = () => {
        isDisabled.value = !isDisabled.value;
      }

      const items = ref(this.templates);

      const pushData = () => {
        console.log("dafdfa")
        const max = items.value.length + pageSize;
        const min = max - pageSize;
        // for (let i = min; i < max; i++) {
        //   items.value.push(i);
        // }
      }
      
      const loadData = (ev) => {
        console.log("XD")
        // setTimeout(() => {
        //   pushData();
        //   console.log('Loaded data');
        //   ev.target.complete();
    
        //   // App logic to determine if all data is loaded
        //   // and disable the infinite scroll
        //   if (items.value.length === 1000) {
        //     ev.target.disabled = true;
        //   }
        // }, 500);
      }
    
    pushData();
    
    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      items,
    }
  },
  }
</script>

<style scoped>

</style>