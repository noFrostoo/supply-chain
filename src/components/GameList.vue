<template>
    <ion-content fullscreen role="feed">
        <ion-card class="item-test" style="height:15%; justify-content: space-around;">
            <ion-label>Lobby Name</ion-label>
            <ion-label>Players State</ion-label>
            <ion-label>Started</ion-label>
        </ion-card>
        <ion-list id="game-list">
        <ion-item
            v-for="item in items"
            :key="item"
            role="article"
        >
            <ion-label>{{item}}</ion-label>
            <ion-label>{{item}}</ion-label>
            <ion-label>{{item}}</ion-label>
            <ion-button>Connect</ion-button>
        </ion-item>
        </ion-list>

        <ion-infinite-scroll threshold="200px" id="infinitescroll" @ionInfinite="loadData($event)" >
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </ion-content>
</template>

<script lang="js">
  import {IonButton, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonList, IonItem } from '@ionic/core';
  import {ref } from "vue";

  let games = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ];

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
    name: "GameList",
    setup() {
      console.log("XDDD")
      let pageSize = 10

      const isDisabled = ref(false);
      const toggleInfiniteScroll = () => {
        isDisabled.value = !isDisabled.value;
      }
      const items = ref([]);

      const pushData = () => {
        console.log("dafdfa")
        const max = items.value.length + pageSize;
        const min = max - pageSize;
        for (let i = min; i < max; i++) {
          items.value.push(i);
        }
      }
      
      const loadData = (ev) => {
        console.log("XD")
        setTimeout(() => {
          pushData();
          console.log('Loaded data');
          ev.target.complete();
    
          // App logic to determine if all data is loaded
          // and disable the infinite scroll
          if (items.value.length === 1000) {
            ev.target.disabled = true;
          }
        }, 500);
      }
    
    pushData();
    
    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      items
    }
  },
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: games
      }
    },
  }
</script>

<style>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}

.item-test{
    background:brown;
}

</style>