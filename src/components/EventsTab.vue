<template>
       <ion-list>
          <ion-item
              v-for="event in events"
              :key="event.name"
              class="item"
          >
              <ion-label>{{event.name}}</ion-label>
              <ion-item>
              </ion-item>
              <ion-button @click="editEvent(event.id)">Edit</ion-button>
              <ion-button @click="deleteEvent(event.id)">Delete</ion-button>
          </ion-item>
        </ion-list>
        
        <!-- modal to add or edit  -->
        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button @click="newEvent()">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>


        <ion-modal class="event-modal" ref="modal" :backdropDismiss="false" :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Event</ion-title>
            <ion-buttons @click="addAction()" slot="end">
              <ion-button >Add action</ion-button>
            </ion-buttons>
            <ion-buttons v-if="!editing" @click="addEvent()" slot="end">
              <ion-button >Add</ion-button>
            </ion-buttons>
            <ion-buttons v-if="editing" @click="saveEvents()" slot="end">
              <ion-button >Save</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
          <ion-list>

            <ion-item>
              <ion-label position="floating">Event Name</ion-label>
              <ion-input v-model="eventEditing.name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-select v-model="eventEditing.condition.type" interface="action-sheet" placeholder="Select condition">
                <ion-select-option value="RoundMet">Round</ion-select-option>
                <ion-select-option value="ValueExceed">Value Exceeded</ion-select-option>
                <ion-select-option value="SingleChange">Single value change</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- condition 1 round med -->
            <ion-item v-if="eventEditing.condition.type == 'RoundMet'">
              <ion-label position="floating">Round </ion-label>
              <ion-input v-model.number="eventEditing.condition.round"  type="number"></ion-input>
            </ion-item>

            <!-- condition 2 value exceed  and single change-->
            <ion-item v-if="eventEditing.condition.type == 'ValueExceed' || eventEditing.condition.type == 'SingleChange' " >
              <ion-select v-model="eventEditing.condition.resource" interface="action-sheet" placeholder="Select resource">
                <ion-select-option value="Money">Money</ion-select-option>
                <ion-select-option value="MagazineState">Magazine State</ion-select-option>
                <ion-select-option value="Performance">Performance</ion-select-option>
                <ion-select-option value="BackOrderValue">Back Order Value</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-if="eventEditing.condition.type == 'ValueExceed' || eventEditing.condition.type == 'SingleChange' ">
              <ion-label position="floating">Value </ion-label>
              <ion-input v-model.number="eventEditing.condition.value" type="number" ></ion-input>
            </ion-item>

            <!-- just cond 2-->
            <ion-item v-if="eventEditing.condition.type == 'ValueExceed'" >
              <ion-select v-model="eventEditing.condition.met_by" interface="action-sheet" placeholder="Met by">
                <ion-select-option value="SinglePlayer">Single Player</ion-select-option>
                <ion-select-option value="Average">Average</ion-select-option>
                <ion-select-option value="AllPlayers">All Players</ion-select-option>
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
                <ion-input v-model.number="action.value" type="number"></ion-input>
              </ion-item>

              <div class="ion-padding" v-if="action.type == 'ChangeSettings'" slot="content">
                <ion-button slot="content" expand="block" @click="openSettingsChangeModal(action)">Open modal editor</ion-button>
              </div>  

            </ion-accordion>
          </ion-accordion-group>

          </ion-list>
          
        </ion-content>
      </ion-modal>

      <ion-modal class="settings-modal" ref="settingsModal" :backdropDismiss="false" :is-open="settingsModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Settings</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setSettingsModalOpen(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
          <SettingsTab class="settings-item" :initLobby="newLobby" :update="saveNewLobby" :isTemplate="true" />
        </ion-content>  
      </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { IonCheckbox, IonAccordion,  IonAccordionGroup, IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonFab, IonFabButton, IonIcon,  IonSelect, IonSelectOption , IonHeader, IonModal, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { add } from 'ionicons/icons';
import SettingsTab from '@/components/SettingsTab.vue';

let events = []

let defaultEvent = {
  id: 0,
  name: null,
  condition: {
    type: null,
  },
  actions: [],
  recipients: null,
  run_once: true
}

export default defineComponent({
  name: 'EventTab',
  props: ["updateEvents", "initialEvents", "lobby"],
  components: { IonList, IonItem, SettingsTab, IonCheckbox, IonAccordion, IonAccordionGroup, IonSelect, IonLabel, IonInput, IonFab, IonButton, IonButtons, IonFabButton, IonIcon, IonSelectOption, IonHeader, IonToolbar, IonModal, IonTitle, IonContent },
  data() {

    if (this.initialEvents !== undefined) {
      events = this.initialEvents
    }
    
    let newLobby = {}
    if (this.lobby !== undefined) {
      newLobby = {...this.lobby}
    }

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
      nextActionID: 1,
      nextEventID: 1,
      editing: false,
      newLobby: newLobby,
      settingsModalOpen: false,
      settingsChangeAction: null,
    }
  },
  setup() {
    return { add }
  },
  methods: {
    setOpen(open) {
      this.isOpen = open
    },
    setSettingsModalOpen(open) {
      this.settingsModalOpen = open
    },  
    newEvent() {
      this.eventEditing = {...this.defaultEvent}
      this.eventEditing.id = this.nextEventID
      this.nextEventID += 1
      this.editing = false;
      this.setOpen(true)
    },
    async addEvent() {
      console.log(this.eventEditing)
      this.events.push({...this.eventEditing})
      this.eventEditing = {...this.defaultEvent}
      this.eventEditing.id = this.nextEventID
      this.nextEventID += 1
      console.log(this.events)
      await this.updateEvents(this.events)
      this.setOpen(false)
      this.$refs.modal.$el.dismiss()
    },
    async deleteEvent(id) {
      const index = this.events.findIndex(obj => obj.id === id);
      this.events = [
          ...this.events.slice(0, index),
          ...this.events.slice(index + 1)
      ]
      console.log("event deleted", this.events)
      await this.updateEvents(this.events)
    },
    editEvent(id) {
      console.log(this.events)
      let index = this.events.findIndex(obj => obj.id === id);
      this.eventEditing = this.events[index]
      this.editing = true;
      this.setOpen(true)
      console.log(this.eventEditing)
    },
    async saveEvents() {
      await this.updateEvents(this.events)
    },
    async deleteAction(id) {

      const index = this.eventEditing.actions.findIndex(obj => obj.id === id);
      this.eventEditing.actions = [
          ...this.eventEditing.actions.slice(0, index),
          ...this.eventEditing.actions.slice(index + 1)
      ]
      console.log(this.eventEditing.actions)
      await this.updateEvents(this.events)
    },
    async addAction() {
      let action = {...this.defaultAction}
      action.id = this.nextActionID
      this.nextActionID += 1
      this.eventEditing.actions.push(action)
      await this.updateEvents(this.events)
    },
    saveNewLobby(lobby) {
      this.settingsChangeAction.new_settings = lobby.settings
      this.newLobby = lobby
      this.settingsModalOpen = false
      let index = this.eventEditing.actions.find(obj => obj.id === this.settingsChangeAction.id);
      this.eventEditing.actions[index] = this.settingsChangeAction
    },
    openSettingsChangeModal(action) {
      this.settingsChangeAction = action
      this.settingsModalOpen = true
    }
  }

});
</script>
  

<style>
.event-modal .modal-wrapper {
  width: 100%;
  height: 100%;
}

.settings-modal .modal-wrapper {
  width: 100%;
  height: 100%;
}

</style>