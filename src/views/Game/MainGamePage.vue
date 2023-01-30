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
          <div v-if="!foundFinished && !amIOwner">
            <ion-grid >
              <ion-row>
                <ion-col size="4" >
                  <ion-row class="center" >
                   <h2>Incoming orders</h2>
                  </ion-row>
                  <ion-row class="center" :key="order.value" v-for="order in state.incoming_orders">
                    <ion-label>{{ order.value }}</ion-label>
                  </ion-row>
                </ion-col>
                <ion-col size="4" >
                  <ion-row class="center">
                    <h2>You order</h2>
                  </ion-row>
                  <ion-row class="center" >
                    <ion-input v-model.number="value"></ion-input>
                  </ion-row>
                  <ion-row class="center" >
                    <ion-button @click="endRound">End Round</ion-button>
                  </ion-row>
                  <ion-row class="center">
                    <h2>Stats</h2>
                  </ion-row>
                    <ion-row class="center" >
                      <ion-list class="item" >
                        <ion-item class="center">
                          <ion-label>Money:</ion-label>
                          <ion-label>{{ state.money }}</ion-label>
                        </ion-item>
                        <ion-item class="center">
                          <ion-label>Magazine:</ion-label>
                          <ion-label>{{ state.magazine_state }}</ion-label>
                        </ion-item>
                        <ion-item class="center">
                          <ion-label>BackOrder:</ion-label>
                          <ion-label>{{ state.back_order_sum }}</ion-label>
                        </ion-item>
                        <ion-item class="center">
                          <ion-label>Spent Money:</ion-label>
                          <ion-label>{{ state.spent_money }}</ion-label>
                        </ion-item>
                      </ion-list>
                    </ion-row>
                </ion-col>
                <ion-col size="4" >
                  <ion-row class="center" >
                    <h2>Next orders to be fulfilled</h2>
                  </ion-row>
                  <ion-row class="center"  :key="order.value" v-for="order in state.requested_orders">
                    <ion-label>{{ order.value }}</ion-label>
                  </ion-row>
                </ion-col>
                </ion-row>
            </ion-grid>
          </div>
          <div v-else-if="amIOwner">
            Admin page

          </div>
          <div v-else>
            Round finished, waiting for others to finish 

          </div>

          <ion-modal  ref="modal" :is-open="newRound"  >
            <ion-header>
              <ion-toolbar>
                  <ion-title>New Round</ion-title>
                  <ion-buttons slot="end">
                  <ion-button @click="closeModal">Confirm</ion-button>
                  </ion-buttons>
              </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                  <h2>New Round is about to start!</h2>

                  <h2>Last Round:</h2>
                  <div v-if="roundSummary.moneyDiff > 0"> You earn {{ roundSummary.moneyDiff }}</div>
                  <div v-else>You lost {{ roundSummary.moneyDiff }}</div>
                  <div v-if="roundSummary.magazineDiff > 0"> Your magazine increased by: {{ roundSummary.magazineDiff }}</div>
                  <div v-else>Your magazine decreased by {{ roundSummary.moneyDiff }}</div>
                  <div v-if="roundSummary.backOrderDiff > 0"> Your back order increased by {{ roundSummary.backOrderDiff }}</div>
                  <div v-else>Your back order decreased by  {{ roundSummary.backOrderDiff }}</div>
                  
                  You placed an order for {{ roundSummary.placedOrder.value }}.
                  You got an order for {{ roundSummary.gotOrder.value }} and sent an order for {{ roundSummary.sendOrder.value }}

              </ion-content>
          </ion-modal>

          <ion-modal  ref="modalGame" :is-open="gameEnd"  >
            <ion-header>
              <ion-toolbar>
                  <ion-title>Game end</ion-title>
                  <ion-buttons slot="end">
                  <ion-button @click="closeModal">Return to main menu</ion-button>
                  </ion-buttons>
              </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                  <h1 class="center">Game ended</h1>
              </ion-content>
          </ion-modal>

          <ion-modal  ref="modalEvents" :is-open="events.length != 0"  >
            <ion-header>
              <ion-toolbar>
                  <ion-title>Event</ion-title>
                  <ion-buttons slot="end">
                  <ion-button @click="processEvent">Proceed</ion-button>
                  </ion-buttons>
              </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                  <h2>{{ currentEvent }}</h2>
              </ion-content>
          </ion-modal>

      </ion-content>
    </ion-page>
  </ion-page>
</template>


<script>
import { IonPage, IonInput, IonRow,IonCol, IonList, IonItem, IonModal, IonLabel, IonGrid, IonButton, IonButtons, IonMenuButton,  IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuWidget from '@/components/MenuWidget.vue';
import { useIonRouter } from '@ionic/vue';

export default  {
  name: 'MainGamePage',
  components: {  IonHeader, IonInput, IonButton, IonModal, IonList, IonItem, IonLabel, IonRow,IonCol, IonGrid,  MenuWidget, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      value: 0,
      sentOrder: false,
      newOrder: null
    }
  },
  methods: {
    async endRound() {
      console.log("value", this.value)
      await this.$store.dispatch("sendEndRound", this.value)
    },
    async closeModal() {
      this.$store.commit("newRoundStarted")
      this.$refs.modal.$el.dismiss()
    },
    async endGame() {
      this.$store.commit("resetGameEnd")
      this.$refs.modalGame.$el.dismiss()
      useIonRouter().push("/home")
    },
    async processEvent() {
      this.$store.commit("popCurrentEvent")
      if (this.$store.getters["events"].length == 0) {
        this.$refs.modalEvents.$el.dismiss()
      }
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
    },
    foundFinished() {
      return this.$store.getters["roundFinish"]
    },
    newRound() {
      if (this.$store.getters["round"] == 0){
        return false
      }
      return this.$store.getters["newRound"]
    },
    gameEnd() {
      return this.$store.getters["gameEnd"]
    },
    events () {
      return this.$store.getters["events"]
    },
    currentEvent() {
      if (this.$store.getters["events"].length != 0) {
        return this.$store.getters["events"][0]
      }

      return null
    },
    roundSummary() {
      return this.$store.getters["roundSummary"]
    },
    amIOwner() {
      return this.$store.getters["amIOwner"]
    }
  },
  watch: {

  }

};
</script>

<style scoped>
  .test {
    background-color:blue;
   }
  .center {
    display: flex;
    justify-content: center;
    text-align: center;
   }
  .item {
    width: 100% !important;
    min-width: 100% !important;
   }
</style>
