<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>History</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">History</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item  v-if="show_others" >
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
              Performance
            </th>
            <th class="text-left">
              Back Order
            </th>
            <th class="text-left">
              Placed Order
            </th>
            <th class="text-left">
              Received Order
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
            <td> {{ round.performance }}</td>
            <td> {{ round.back_order_sum }}</td>
            <td> {{ round.placed_order }}</td>
            <td> {{ round.received_order }}</td>
          </tr>
        </tbody>

      </v-table>

    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'HistoryPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(){
    let players = this.$store.getters["players"]
    let chosenPlayer = this.$store.getters["user"]
    if (this.$store.getters["amIOwner"]) {
      chosenPlayer = players[0]
    }

    let rounds = []
    for(let round of this.$store.getters["history"]) {
      //TODO: missing player
      rounds.push(round[chosenPlayer.id])
    }

    return {
      show_others: true,
      players: players,
      chosenPlayer: chosenPlayer,
      rounds: rounds
    }
  }
});
</script>
