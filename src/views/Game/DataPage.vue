<template>
  <ion-page>
    <MenuWidget/>
    <ion-page id="main-content" >
      <ion-header>
        <ion-toolbar content-id="main-content" >
          <ion-buttons  slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          <ion-title>Control</ion-title>
        </ion-toolbar>
      </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Stats</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-grid>
          <ion-col>
            <ion-row class="center">
              <div>
                <v-chart class="chart" autoresize :option="option" />
              </div>
            </ion-row>
            <ion-row class="center">
              <h3>Select wanted statistic types</h3>
            </ion-row>
            <ion-row class="center" >
              <h3>Select player</h3>
            </ion-row>
            <ion-row v-if="chosenPlayer !== undefined" class="center" >
              <ion-select interface="action-sheet" v-model="chosenPlayer" placeholder="Select players">
                <ion-select-option v-for="player in players" :key="player.id" :value="player">{{ player.username }}</ion-select-option>
              </ion-select>
            </ion-row>
          </ion-col>
        </ion-grid>
      </ion-content>
    </ion-content>
  </ion-page>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import { api } from '@/api';
import MenuWidget from '@/components/MenuWidget.vue';

import { use } from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from "echarts/charts";
import { thumbsUpSharp } from 'ionicons/icons';
import { useStore } from 'vuex';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

let statsTypes = [
  {name: "Money", val: "money"},
  {name: "MagazineState", val: "magazine_state"},
  {name: "BackOrder", val: "back_order"},
  {name: "PlacedOrder", val: "placed_order"},
  {name: "ReceivedOrder", val: "received_order"},
  {name: "SpentMoney", val: "spent_money"} ,
]



export default defineComponent({
  name: 'DataPage',
  components: { IonHeader, IonSelect, MenuWidget, IonButtons, IonMenuButton, IonSelectOption, IonGrid, IonRow, IonCol, VChart, IonToolbar, IonTitle, IonContent, IonPage },
  provide: {
    [THEME_KEY]: "dark",
  },
  async setup() {
    let store = useStore()
    let players = store.getters["players"]
    console.log(store.getters["lobby"])
    let stats = await (await api.getPlayersStats(store.getters["token"], store.getters["lobby"].id)).data
    let chosenPlayer = players[0];

    return {
      players: players,
      stats: stats,
      statsTypes: statsTypes,
      chosenPlayer: chosenPlayer
    }
  },
  methods: {
  },
  computed: {
    option() {
      console.log(this.chosenPlayer)
      console.log(this.stats)
      let round = this.$store.getters["round"]
      console.log(round)

      let series = []
      for (let stat of this.statsTypes) {
        let data = Object.values(this.stats[stat.val][this.chosenPlayer.id])

        series.push({
          name: stat.name,
          type: "line",
          data: data
        })
      }
      
      console.log(series)

      return {
        tooltip: {},
        legend: {},
        xAxis: {
          data: Array.from(Array(round+1).keys()),
          name: "Round number",
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          axisLabel: {
            hideOverlap: true,
          }
        },
        yAxis: {
          name: "Statistic"
        },
        series: series
      };
    },
  }
});
</script>

<style scoped>
.chart {
  width: 140vh;
  height: 80vh;
  background-color: blue;
}
.center {
    display: flex;
    justify-content: center;
    text-align: center;
   }
</style>
