<template>
  <MenuWidget/>
  <ion-page id="main-content" >
    <ion-header>
      <ion-toolbar>
        <ion-buttons  slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-grid>
        <ion-col>
          <ion-row class="griditem">
            <ion-col size-md="2" >
                <ion-label position="floating">Max Rounds</ion-label>
            </ion-col>
            <ion-col size-md="2" >
                <ion-input type="number" placeholder="Enter text"></ion-input>
            </ion-col>
            <ion-col>
                <ion-label position="floating">Show stats to users</ion-label>
                <ion-checkbox></ion-checkbox>
            </ion-col>
            <ion-col>
                <ion-label position="floating">Unlimited money</ion-label>
                <ion-checkbox></ion-checkbox>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button id="class" expand="block" >User Classes</ion-button>
            </ion-col>
            <ion-col>
              <ion-row>
                <p> User Classes:  </p>
                <p
                  v-for="uClass in classes"
                  :key="uClass"
                >
                  {{ uClass.class }}
                </p>
              </ion-row>
            </ion-col>
          </ion-row>
          <ion-row >
            <ion-col>
              <ion-row class="row" >
                <ion-button style="margin: 5px" id="resourcePrice" >Set resource prices</ion-button>
                <ion-button style="margin: 5px" id="startMoney">Set start money</ion-button>
                <ion-button style="margin: 5px" id="startMagazine">Set start magazine</ion-button>
                <ion-button style="margin: 5px" id="transportCost">Set transport cost</ion-button>
              </ion-row>
              <ion-row class="row" >
                <ion-button style="margin: 5px" id="fixOrderCost">Set fix order cost</ion-button>
                <ion-button style="margin: 5px" id="backOrderCost">Set back order cost</ion-button>
                <ion-button style="margin: 5px" id="additionalCost">Set additional cost</ion-button>
              </ion-row>
              <ion-row class="row" >
                <ion-button style="margin: 5px" id="startQueue">Set order queue</ion-button>
                <ion-button style="margin: 5px" id="demand">Set demand style</ion-button>
                <ion-button style="margin: 5px" id="supply">Set supply style</ion-button>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-col>

      </ion-grid>

      <ion-modal handle-behavior="cycle" ref="classModal"  :can-dismiss="canDismiss" trigger="class">
        <ion-header>
          <ion-toolbar>
            <ion-title>User Classes</ion-title>
            <ion-buttons @click="addClass()" slot="end">
              <ion-button >Add</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button @click="dissmisModal('settings', false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-card
            v-for="uClass in classes"
            :key="uClass.id"
          >
          <ion-item :id="uClass.id" :ref="`class${uClass.id}`">
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('class', uClass.id, $event.target.value)" ></ion-input>
            <ion-button>Delete</ion-button>
          </ion-item>
          </ion-card>
        </ion-content>
      </ion-modal>

      <ion-modal handle-behavior="cycle"  ref="resourcePriceModal"  :can-dismiss="canDismiss" trigger="resourcePrice"  >
        <ion-header>
        <ion-toolbar>
            <ion-title>Resource Price</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('resourcePrice', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`resourcePrice${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('resourcePrice', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
        </ion-content>
    </ion-modal>
      
    <ion-modal handle-behavior="cycle" ref="startMoneyModal"  :can-dismiss="canDismiss" trigger="startMoney">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('startMoney', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`startMoney${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('startMoney', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="startMagazineModal"  :can-dismiss="canDismiss" trigger="startMagazine">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('startMagazine', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`startMagazine${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('startMagazine', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle"  ref="startMagazineModal"  :can-dismiss="canDismiss" trigger="startMagazine">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('startMagazine', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`startMagazine${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('startMagazine', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="transportCostModal" :can-dismiss="canDismiss" trigger="transportCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('transportCost', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`transportCost${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('transportCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="magazineCostModal"  :can-dismiss="canDismiss" trigger="magazineCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('magazineCost', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`magazineCost${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('magazineCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="fixOrderCostModal"  :can-dismiss="canDismiss" trigger="fixOrderCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('fixOrderCost', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`fixOrderCost${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('fixOrderCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="backOrderCostModal"  :can-dismiss="canDismiss" trigger="backOrderCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('backOrderCost', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`backOrderCost${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('backOrderCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="additionalCostModal"  :can-dismiss="canDismiss" trigger="additionalCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('additionalCost', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`additionalCost${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('additionalCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="startQueueModal"  :can-dismiss="canDismiss" trigger="startQueue">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('startQueue', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`startQueue${uClass.id}`"
        >
            <ion-label position="floating">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" @ionInput="changeValue('startQueue', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="demandModal"  :can-dismiss="canDismiss" trigger="demand">
      <ion-header>
        <ion-toolbar>
            <ion-title>Demand Generation</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('demand', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-select v-model="demand.type" interface="action-sheet" placeholder="Select type">
                <ion-select-option value="Linear">Linear</ion-select-option>
                <ion-select-option value="Multiplication">Multiplication</ion-select-option>
                <ion-select-option value="Exponential">Exponential</ion-select-option>
                <ion-select-option value="list">List</ion-select-option>
            </ion-select>
            </ion-item>
            <ion-item v-if="demand.type == 'Linear' || demand.type == 'Multiplication' || demand.type == 'Exponential'">
                <ion-label position="floating">Start</ion-label>
                <ion-input v-model="demand.start" type="number" ></ion-input>
            </ion-item>
            <ion-item v-if="demand.type == 'Linear' || demand.type == 'Multiplication'">
                <ion-label position="floating">Increase</ion-label>
                <ion-input v-model="demand.increase" type="number" ></ion-input>
            </ion-item>
            <ion-item v-if="demand.type == 'Exponential'">
                <ion-label position="floating">Power</ion-label>
                <ion-input v-model="demand.power" type="number" ></ion-input>
            </ion-item>
            <ion-item v-if="demand.type == 'Exponential'">
                <ion-label position="floating">Modulator</ion-label>
                <ion-input v-model="demand.modulator" type="number" ></ion-input>
            </ion-item>
            <ion-item v-if="demand.type == 'List'">
                <ion-label position="floating">Enter list(separated ",")</ion-label>
                <ion-input v-model="demand.list"></ion-input>
            </ion-item>
        </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="supplyModal"  can-dismiss="true"  trigger="supply">
      <ion-header>
        <ion-toolbar>
            <ion-title>Supply Generation</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="dissmisModal('supply', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-select v-model="supply.type" interface="action-sheet" placeholder="Select type">
                <ion-select-option value="Linear">Linear</ion-select-option>
                <ion-select-option value="Multiplication">Multiplication</ion-select-option>
                <ion-select-option value="Exponential">Exponential</ion-select-option>
                <ion-select-option value="list">List</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item  v-if="supply.type == 'Linear' || supply.type == 'Multiplication' || supply.type == 'Exponential'">
              <ion-label position="floating">Start</ion-label>
              <ion-input v-model="supply.start" type="number" ></ion-input>
          </ion-item>
          <ion-item  v-if="supply.type == 'Linear' || supply.type == 'Multiplication'">
              <ion-label position="floating">Increase</ion-label>
              <ion-input v-model="supply.increase" type="number" ></ion-input>
          </ion-item>
          <ion-item  v-if="supply.type == 'Exponential'">
              <ion-label position="floating">Power</ion-label>
              <ion-input v-model="supply.power" type="number" ></ion-input>
          </ion-item>
          <ion-item  v-if="supply.type == 'Exponential'">
              <ion-label position="floating">Modulator</ion-label>
              <ion-input v-model="supply.modulator" type="number" ></ion-input>
          </ion-item>
          <ion-item  v-if="supply.type == 'List'">
              <ion-label position="floating">Enter list(separated ",")</ion-label>
              <ion-input v-model="supply.list"></ion-input>
          </ion-item>
        </ion-content>
    </ion-modal>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="saveSettings()">
        <ion-icon :icon="save"></ion-icon>
      </ion-fab-button>
    </ion-fab>


    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonSelect, IonSelectOption ,IonItem, IonButton, IonButtons, IonList, IonCard, IonCheckbox, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonModal, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { save } from 'ionicons/icons';
import ClassValueModalVue from '@/components/ClassValueModal.vue';
import MenuWidget from '@/components/MenuWidget.vue';

export default  defineComponent({
  name: 'SettingsPage',
  props: ['updateSettings'],
  components: {IonHeader, MenuWidget,  IonSelect, IonSelectOption , IonToolbar, IonTitle, IonItem, IonButton, IonButtons, IonList, IonCard, IonCheckbox, IonContent, IonPage, IonModal, IonGrid, IonRow, IonCol, IonLabel, IonInput, },  
  data() {
    return {
      classes: [{
        id: 1,
        class: 1,
        startMoney: 1,
        resourcePrice: 1,
        startMagazine: 1,
        transportCost: 1,
        magazineCost: 1,
        fixOrderCost: 1,
        backOrderCost: 1,
        additionalCost: 0,
        startQueue: [1,1],
      }],
      demand: {},
      supply: {},
      maxRounds: 0,
      showStats: true,
      unlimitedMoney: true,
      canDismiss: true,
      nextClassNum: 2,
      nextClassId: 2
    }
  },
  methods: {
    saveSettings() {
      console.log("save")
    },  
    dissmisModal(modal, isOpen) {
      let modalsDismiss = {
      "class": this.$refs.classModal.$el.dismiss(),
      "resourcePrice": this.$refs.resourcePriceModal.$el.dismiss(),
      "startMoney": this.$refs.startMoneyModal.$el.dismiss(),
      "startMagazine": this.$refs.startMagazineModal.$el.dismiss(),
      "transportCost": this.$refs.transportCostModal.$el.dismiss(),
      "magazineCost": this.$refs.magazineCostModal.$el.dismiss(),
      "fixOrderCost": this.$refs.fixOrderCostModal.$el.dismiss(),
      "backOrderCost": this.$refs.backOrderCostModal.$el.dismiss(),
      "additionalCost": this.$refs.additionalCostModal.$el.dismiss(),
      "startQueue": this.$refs.startQueueModal.$el.dismiss(),
      "demand": this.$refs.demandModal.$el.dismiss(),
      "supply": this.$refs.supplyModal.$el.dismiss()
      }
    },
    addClass() {
      this.classes.push({id: this.nextClassId, class: this.nextClassNum})
      this.nextClassId += 1
      this.nextClassNum += 1
    },
    changeValue(modalName, id, newValue) {
      console.log(this.$refs[modalName + id][0])
      this.$refs[modalName + id][0].classList.remove('ion-valid');
      this.$refs[modalName + id][0].classList.remove('ion-invalid');

      if (newValue === '') return;

      if (modalName == "class") {
        for (let uClass in this.classes) {
          if (uClass.id != id && uClass.value == newValue) {
            this.$refs[modalName + id][0].classList.add('ion-invalid');
            console.log("invalid")
          }
        }
      }
      
      this.classes.find(obj => {
        return obj.id === id 
      })[modalName] = newValue

      this.$refs[modalName + id][0].classList.add('ion-valid');
    }
  },
  setup() {
    return { save }
  }
})
</script>

<style scoped>
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

</style>