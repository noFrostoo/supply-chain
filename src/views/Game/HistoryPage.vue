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
        <ion-select interface="action-sheet" placeholder="Select resource">
          <ion-select-option v-for="player in players" :key="player.id" :value="player.id">{{ player.username }}</ion-select-option>
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

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(){
    return {
      show_others: true,
      players: [
        {
          id: "XDXDD",
          username: "XD"
        }
      ],
      rounds: [
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },      {
        round: 1,
        money:1,
        spent_money:1,
        magazine_state: 1,
        performance: 1,
        back_order_sum: 1,
        placed_order: 1,
        received_order: 1
      },
    ]
    }
  }
});
</script>
