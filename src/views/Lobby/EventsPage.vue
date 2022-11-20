<template>
  <MenuWidget/>
  <ion-page id="main-content" >
    <ion-header>
      <ion-toolbar>
        <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-list>
          <ion-item
              v-for="event in events"
              :key="event.name"
              class="item"
          >
              <ion-label>{{event.name}}</ion-label>
              <ion-item>
              </ion-item>
              <ion-button>Edit</ion-button>
          </ion-item>
        </ion-list>
        
        <!-- modal to add or edit  -->
        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button @click="setOpen(true)">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>


        <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Event</ion-title>
            <ion-buttons @click="addAction()" slot="end">
              <ion-button >Add action</ion-button>
            </ion-buttons>
            <ion-buttons @click="addEvent()" slot="end">
              <ion-button >Add</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>

            <ion-item>
              <ion-label position="floating">Event Name</ion-label>
              <ion-input v-model="eventEditing.name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-select v-model="eventEditing.conditionName" interface="action-sheet" placeholder="Select condition">
                <ion-select-option value="RoundMet">Round</ion-select-option>
                <ion-select-option value="ValueExceed">Value Exceeded</ion-select-option>
                <ion-select-option value="SingleChange">Single value change</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- condition 1 round med -->
            <ion-item v-if="eventEditing.conditionName == 'RoundMet'">
              <ion-label position="floating">Round </ion-label>
              <ion-input v-model="eventEditing.condition.round"  type="number"></ion-input>
            </ion-item>

            <!-- condition 2 value exceed  and single change-->
            <ion-item v-if="eventEditing.conditionName == 'ValueExceed' || eventEditing.conditionName == 'SingleChange' " >
              <ion-select v-model="eventEditing.condition.resource" interface="action-sheet" placeholder="Select resource">
                <ion-select-option value="Money">Money</ion-select-option>
                <ion-select-option value="MagazineState">Magazine State</ion-select-option>
                <ion-select-option value="Performance">Performance</ion-select-option>
                <ion-select-option value="BackOrderValue">Back Order Value</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-if="eventEditing.conditionName == 'ValueExceed' || eventEditing.conditionName == 'SingleChange' ">
              <ion-label position="floating">Value </ion-label>
              <ion-input v-model="eventEditing.condition.value" type="number" ></ion-input>
            </ion-item>

            <!-- just cond 2-->
            <ion-item v-if="eventEditing.conditionName == 'ValueExceed'" >
              <ion-select v-model="eventEditing.condition.metBy" interface="action-sheet" placeholder="Met by">
                <ion-select-option value="SinglePlayer">Single Player</ion-select-option>
                <ion-select-option value="PlayerPercent">Player Percent</ion-select-option>
                <ion-select-option value="Average">Average</ion-select-option>
                <ion-select-option value="AllPlayers">All Players</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-if="eventEditing.conditionName == 'ValueExceed' && eventEditing.condition.metBy == 'PlayerPercent' ">
              <ion-label position="floating">Percentage </ion-label>
              <ion-input v-model="eventEditing.conditionName.playerPercentage" type="number" ></ion-input>
            </ion-item>

            <ion-item>
              <ion-select v-model="eventEditing.recipients" interface="action-sheet" placeholder="Select recipients">
                <ion-select-option value="SinglePlayer">Single player</ion-select-option>
                <ion-select-option value="PlayerMetConditions">Player who met condition</ion-select-option>
                <ion-select-option value="AllPlayers">All players</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="fixed">Run Once</ion-label>
              <ion-checkbox v-model="eventEditing.run_once"></ion-checkbox>
            </ion-item>

          <ion-accordion-group>
            <ion-accordion  v-for="action in eventEditing.actions" :key="action.id" :value="action.id">
              <ion-item slot="header">
                <ion-label>Action {{ action.id }}</ion-label>
              </ion-item>
              <ion-button slot="content" expand="block" @click="deleteAction(action.id)">Delete</ion-button>
              <ion-item class="ion-padding" slot="content">
                <ion-select v-model="action.type" interface="action-sheet" placeholder="Select action type">
                  <ion-select-option value="ShowMessage">Show message</ion-select-option>
                  <ion-select-option value="ChangeSettings">Change settings</ion-select-option>
                  <ion-select-option value="AddResource">Add resource</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item v-if="action.type == 'ShowMessage'" slot="content">
                <ion-label position="floating">Message </ion-label>
                <ion-input v-model="action.message"></ion-input>
              </ion-item>
              <ion-item v-if="action.type == 'ShowMessage' || action.type == 'AddResource' " slot="content">
                <ion-select v-model="action.target" interface="action-sheet" placeholder="Select action target">
                  <ion-select-option value="EventTarget">Event target</ion-select-option>
                  <ion-select-option value="AllPlayers">All players</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item v-if="action.type == 'AddResource'" slot="content" >
                <ion-select v-model="action.resource" interface="action-sheet" placeholder="Select resource">
                  <ion-select-option value="Money">Money</ion-select-option>
                  <ion-select-option value="MagazineState">Magazine State</ion-select-option>
                  <ion-select-option value="Performance">Performance</ion-select-option>
                  <ion-select-option value="BackOrderValue">Back Order Value</ion-select-option>
                </ion-select>
              </ion-item>
              
              <ion-item v-if="action.type == 'AddResource'" slot="content">
                <ion-label position="floating">Value </ion-label>
                <ion-input v-model="action.value" type="number"></ion-input>
              </ion-item>

            </ion-accordion>
          </ion-accordion-group>

          </ion-list>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>

  
</template>
  
<script>
import { defineComponent } from 'vue';
import { IonPage, IonCheckbox, IonMenuButton, IonAccordion,  IonAccordionGroup, IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonFab, IonFabButton, IonIcon,  IonSelect, IonSelectOption , IonHeader, IonModal, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { add } from 'ionicons/icons';
import MenuWidget from '@/components/MenuWidget.vue';

let events = []

let defaultEvent = {
  name: null,
  conditionName: null,
  condition: {},
  actions: [],
  recipients: null,
  run_once: true
}

export default defineComponent({
  name: 'EventPage',
  components: { IonList, MenuWidget, IonMenuButton, IonItem, IonCheckbox, IonAccordion, IonAccordionGroup, IonSelect, IonLabel, IonInput, IonFab, IonButton, IonButtons, IonFabButton, IonIcon, IonSelectOption, IonHeader, IonToolbar, IonModal, IonTitle, IonContent, IonPage },
  data() {
    return {
      events,
      isOpen: false,
      eventEditing: defaultEvent,
      defaultAction: {
        id: 0,
        type: null,
        message: "", 
        target: null,
        value: 0,
        resource: null
      },
      defaultEvent,
      nextActionID: 1
    }
  },
  setup() {
    return { add }
  },
  methods: {
    setOpen(open) {
      this.isOpen = open
    },
    addEvent() {
      console.log(this.eventEditing)
      this.events.push({...this.eventEditing})
      this.eventEditing = {...this.defaultEvent}
      console.log(this.events)
    },
    deleteAction(id) {

      const index = this.eventEditing.actions.findIndex(obj => obj.id === id);
      this.eventEditing.actions = [
          ...this.eventEditing.actions.slice(0, index),
          ...this.eventEditing.actions.slice(index + 1)
      ]
      console.log(this.eventEditing.actions)
    },
    addAction() {
      let action = {...this.defaultAction}
      action.id = this.nextActionID
      this.nextActionID += 1
      this.eventEditing.actions.push(action)
    }
  }

});
</script>
  

<style>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}
</style>