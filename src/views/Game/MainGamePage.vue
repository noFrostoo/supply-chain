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
            <ion-title size="large">Control</ion-title>
          </ion-toolbar>
        </ion-header>
          <ion-grid >
            <ion-row>
              <ion-col size="4" >
                <ion-row>
                  Incoming orders
                </ion-row>
                <ion-row :key="order.value" v-for="order in state.incoming_orders">
                  <ion-label>{{ order.value }}</ion-label>
                </ion-row>
              </ion-col>
              <ion-col size="4" >
                <ion-row>
                  Order Value
                </ion-row>
                <ion-row>
                  <ion-input v-model.number="value"></ion-input>
                </ion-row>
                <ion-row>
                  <ion-button @click="endRound">End Round</ion-button>
                </ion-row>
              </ion-col>
              <ion-col size="4" >
                <ion-row>
                  Incoming orders
                </ion-row>
                <ion-row :key="order.value" v-for="order in state.requested_orders">
                  <ion-label>{{ order.value }}</ion-label>
                </ion-row>
              </ion-col>
              </ion-row>
          </ion-grid>
      </ion-content>
    </ion-page>
  </ion-page>
</template>
<script>
import { IonPage, IonInput, IonRow,IonCol, IonLabel, IonGrid, IonButton, IonButtons, IonMenuButton,  IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';

export default  {
  name: 'MainGamePage',
  components: {  IonHeader, IonInput, IonButton, IonLabel, IonRow,IonCol, IonGrid,  MenuWidget, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      value: 0
    }
  },
  methods: {
    endRound() {
      console.log("value", this.value)
    }
  },
  computed: {
    state() {
      if (this.$store.getters["playerState"]) {
        return this.$store.getters["playerState"]
      }
      return {
        user_id: "",
        money: 0,
        spent_money: 0,
        magazine_state: 0,
        performance: 0,
        back_order_sum: 0,
        incoming_orders: [],
        requested_orders: [],
        sent_orders: [],
        placed_order: null,
        received_order: null,
      }
    }
  }

};
</script>

<style scoped>
   .test {
    background-color:blue;
   }
</style>
