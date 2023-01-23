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
            <ion-title size="large">History</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-item  v-if="show_others || amIOwner" >
          <ion-select interface="action-sheet" v-model="chosenPlayer" placeholder="Select players">
            <ion-select-option v-for="player in players" :key="player.id" :value="player">{{ player.username }}</ion-select-option>
          </ion-select>
        </ion-item>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Round
              </th>
              <th class="text-left">
                Money
              </th>
              <th class="text-left">
                Spent Money
              </th>
              <th class="text-left">
                Magazine
              </th>
              <th class="text-left">
                Back Order
              </th>
              <th class="text-left">
                Placed Order
              </th>
              <th class="text-left">
                Placed Order Cost
              </th>
              <th class="text-left">
                Received Order
              </th>
              <th class="text-left">
                Received Order Cost
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="round in rounds"
              :key="round.round"
            >
              <td> {{ round.round }}</td>
              <td> {{ round.money }}</td>
              <td> {{ round.spent_money }}</td>
              <td> {{ round.magazine_state }}</td>
              <td> {{ round.back_order_sum }}</td>
              <td> {{ round.placed_order.value }}</td>
              <td> {{ round.placed_order.cost }}</td>
              <td> {{ round.received_order.value }}</td>
              <td> {{ round.received_order.cost }}</td>
            </tr>
          </tbody>

        </v-table>

      </ion-content>
    </ion-page>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonSelectOption, IonMenuButton, IonButtons, IonItem, IonSelect, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';

export default defineComponent({
  name: 'HistoryPage',
  components: { IonHeader, MenuWidget, IonToolbar, IonMenuButton, IonButtons, IonSelectOption, IonItem, IonSelect, IonTitle, IonContent, IonPage },
  data(){
    let players = this.$store.getters["players"]
    let chosenPlayer = this.$store.getters["user"]
    console.log(this.$store.getters["amIOwner"])
    if (this.$store.getters["amIOwner"]) {
      chosenPlayer = players[0]
    }
    console.log(players)
    return {
      show_others: true,
      players: players,
      chosenPlayer: chosenPlayer,
    }
  },
  computed: {
    rounds() {
      let rounds = []
      console.log(this.chosenPlayer)
      console.log(this.$store.getters["history"])
      for(let round of this.$store.getters["history"]) {
        //TODO: missing player
        console.log(round)
        rounds.push({round: round.round, ...round[this.chosenPlayer.id]})
      }
      
      return rounds
    },
    amIOwner() {
      return this.$store.getters["amIOwner"]
    }
  }
});
</script>
