<template>
    <ion-content fullscreen role="feed">
        <ion-card class="item-test" style="height:15%; justify-content: space-around;">
            <ion-label>Lobby Name</ion-label>
            <ion-label>Players State</ion-label>
            <ion-label>Started</ion-label>
        </ion-card>
        <ion-list id="game-list">
          <ion-item role="article">
            <ion-label>Name</ion-label>
            <ion-label>Max players</ion-label>
            <ion-label>Game Started</ion-label>
            <ion-button style="opacity: 0;"></ion-button>
          </ion-item>
          <ion-item
              v-for="item in items"
              :key="item"
              role="article"
          >
              <ion-label>{{item.name}}</ion-label>
              <ion-label>{{item.max_players}}</ion-label>
              <ion-label v-if="item.started">Yes</ion-label>
              <ion-label v-else>No</ion-label>
              <ion-button @click="connect(item.id)">Connect</ion-button>
          </ion-item>
        </ion-list>

        <ion-infinite-scroll threshold="200px" id="infinitescroll" @ionInfinite="loadData($event)" >
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </ion-content>
</template>

<script lang="js">
  import {IonButton, IonContent, IonCard, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonList, IonItem } from '@ionic/vue';
  import {ref } from "vue";
  import { useIonRouter } from '@ionic/vue';
  import { api } from '@/api'
  import { useStore } from 'vuex'

  export default {
    components: {
      IonButton,
      IonContent, 
      IonInfiniteScroll, 
      IonInfiniteScrollContent,
      IonItem,
      IonLabel,
      IonList,
      IonCard
    },
    name: "GameList",
    props: ["query"],
    methods: {
      async connect(id) {
        await this.$store.dispatch("connectPlayer", id)
        this.$store.dispatch("toast", "Connected")
        this.router.push(`/lobby/${id}/Players`)
      },
      filterFunc(query, items) {
        console.log("xD")
        if (query == "")
          return items

        const filterVal = query.toLowerCase();
        let results = items.filter(d => d.name.toLowerCase().indexOf(filterVal) > -1);
        console.log("filtered", results)
        return results
      }
    },
    data() {
      const store = useStore()
      let pageSize = 25

      const isDisabled = ref(false);
      const toggleInfiniteScroll = () => {
        isDisabled.value = !isDisabled.value;
      }

      let items = ref([]);
      let startOffset = 0

      const pushData = async () => {
        console.log("dafdfa")
        let offset = startOffset;
        if (this.lastOffset !== undefined) {
          offset = this.lastOffset;
          console.log("lel")
        }
        
        console.log("offset", offset)
        const limit = pageSize;
        let lobbies = await (await api.fetchLobbies(store.getters["token"], "Public", limit, offset)).data
        let filtered = this.filterFunc(this.query, lobbies)
        this.lastOffset += filtered.length;

        for (let lobby of filtered) {
          if (items.value.filter(x => x.id === lobby.id).length == 0) {
            items.value.push(lobby);
          }
        }
      }
      
      const loadData = (ev) => {
          pushData().then(() => {
            console.log('Loaded data');
            ev.target.complete();
            ev.target.disabled = true
          })
      }
    
    pushData();
    
    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      pushData,
      items,
      lastOffset: 0,
      router: useIonRouter()
    }
  },
  watch: {
    query: function(newVal, oldVal){
      console.log("newval", newVal, "oldval", oldVal)
      if (newVal != oldVal) {
          console.log("filtering")
          this.lastOffset = 0
          this.items = this.filterFunc(this.query, this.items)
        }
      this.pushData().then(() => {
          console.log('Loaded data');
        })
    }
  }
  
  }
</script>

<style scoped>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}

.item-test{
    background:brown;
}

</style>