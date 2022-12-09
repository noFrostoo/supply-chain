<template>
    <ion-content>
        <ion-grid>
        <ion-col>
          <ion-row v-if="!isTemplate" class="griditem">
            <ion-col >
                <ion-label position="floating">Max Players</ion-label>
            </ion-col>
            <ion-col >
                <ion-input v-model="maxPlayers" type="number" placeholder="Enter text"></ion-input>
            </ion-col>
            <ion-col>
                <ion-label position="floating">Generate Connect Code</ion-label>
                <ion-checkbox v-model="generateCode" ></ion-checkbox>
            </ion-col>
            <ion-col >
                <ion-label position="floating">Connect Code Use Times</ion-label>
            </ion-col>
            <ion-col >
                <ion-input v-model="codeUseTimes" type="number" placeholder="Enter text"></ion-input>
            </ion-col>
            <ion-col>
                <ion-label position="floating">Public</ion-label>
                <ion-checkbox v-model="publicLobby" ></ion-checkbox>
            </ion-col>
            <ion-col >
                <ion-label position="floating">Password</ion-label>
            </ion-col>
            <ion-col >
                <ion-input v-model="password" placeholder="Enter password or leave empty"></ion-input>
            </ion-col>
          </ion-row>
          <ion-row class="griditem">
            <ion-col size-md="2" >
                <ion-label position="floating">Max Rounds</ion-label>
            </ion-col>
            <ion-col size-md="2" >
                <ion-input v-model="maxRounds" type="number" placeholder="Enter text"></ion-input>
            </ion-col>
            <ion-col size-md="2" >
                <ion-label position="floating">Basic resource price</ion-label>
            </ion-col>
            <ion-col size-md="2" >
                <ion-input v-model="resourceBasicPrice" type="number" placeholder="Enter text"></ion-input>
            </ion-col>
            <ion-col>
                <ion-label position="floating">Show stats to users</ion-label>
                <ion-checkbox v-model="showStats" ></ion-checkbox>
            </ion-col>
            <ion-col>
                <ion-label position="floating">Unlimited money</ion-label>
                <ion-checkbox v-model="unlimitedMoney"></ion-checkbox>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size-lg="4">
              <ion-button id="class" expand="block" >User Classes</ion-button>
            </ion-col>
            <ion-col>
              <ion-row>
                <p> User Classes:  </p>
                <p
                  v-for="uClass in classes"
                  :key="uClass"
                >
                  {{ uClass.class }},
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
                <ion-button style="margin: 5px" id="magazineCost">Set magazine cost</ion-button>
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
            <ion-input :value="uClass.resourcePrice" type="number" @ionInput="changeValue('resourcePrice', uClass.id, $event.target.value)" ></ion-input>
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
            <ion-input :value="uClass.startMagazine" type="number" @ionInput="changeValue('startMoney', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="startMagazineModal"  :can-dismiss="canDismiss" trigger="startMagazine">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Magazine</ion-title>
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
            <ion-input :value="uClass.startMagazine" type="number" @ionInput="changeValue('startMagazine', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="transportCostModal" :can-dismiss="canDismiss" trigger="transportCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Transport Cost</ion-title>
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
            <ion-input :value="uClass.transportCost" type="number" @ionInput="changeValue('transportCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="magazineCostModal"  :can-dismiss="canDismiss" trigger="magazineCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Magazine cost</ion-title>
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
            <ion-input :value="uClass.magazineCost" type="number" @ionInput="changeValue('magazineCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="fixOrderCostModal"  :can-dismiss="canDismiss" trigger="fixOrderCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Fix order cost</ion-title>
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
            <ion-input :value="uClass.fixOrderCost" type="number" @ionInput="changeValue('fixOrderCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="backOrderCostModal"  :can-dismiss="canDismiss" trigger="backOrderCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>Back order cost</ion-title>
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
            <ion-input :value="uClass.backOrderCost" type="number" @ionInput="changeValue('backOrderCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal handle-behavior="cycle" ref="additionalCostModal"  :can-dismiss="canDismiss" trigger="additionalCost">
      <ion-header>
        <ion-toolbar>
            <ion-title>additional cost</ion-title>
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
            <ion-input :value="uClass.additionalCost" type="number" @ionInput="changeValue('additionalCost', uClass.id, $event.target.value)" ></ion-input>
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
            <ion-input :value="uClass.startQueue" @ionInput="changeValue('startQueue', uClass.id, $event.target.value)" ></ion-input>
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
    
</template>

<script>
import { IonSelect, IonSelectOption,IonIcon, IonFab, IonFabButton ,IonItem, IonButton, IonButtons, IonList, IonCard, IonCheckbox, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonModal, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { save } from 'ionicons/icons';

  let lobby = null;

export default {
  name: 'SettingsTab',
  props: ['update', 'initLobby', "isTemplate"],
  components: {IonHeader, IonIcon, IonSelect,IonFab, IonFabButton, IonSelectOption , IonToolbar, IonTitle, IonItem, IonButton, IonButtons, IonList, IonCard, IonCheckbox, IonContent, IonModal, IonGrid, IonRow, IonCol, IonLabel, IonInput, },  
  data() {
    let nextId = 1;
    let maxClassNum = 0;
    lobby = this.initLobby;

    console.log("lobby: ", lobby, ", innitLobby", this.initLobby, "update", this.update, "isTemplate", this.isTemplate)

    let classes = [{
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
      }];
    let maxRounds = 0;
    let maxPlayers = 4;
    let resourceBasicPrice = 1;
    let generateCode = false;
    let codeUseTimes = 4;
    let password = null
    let publicLobby = true;
    let showStats = true;
    let unlimitedMoney = false;
    let demand = {};
    let supply = {};

    if (this.lobby != null && this.lobby !== undefined) {
      try {
        for (let uClass in this.lobby.settings.user_classes) {
          classes.push({
            id: nextId,
            class: uClass,
            startMoney: this.lobby.settings.start_money[uClass],
            resourcePrice: this.lobby.settings.resource_price[uClass],
            startMagazine: this.lobby.settings.start_magazine[uClass],
            transportCost: this.lobby.settings.transport_cost[uClass],
            magazineCost: this.lobby.settings.start_money[uClass],
            fixOrderCost: this.lobby.settings.fix_order_cost[uClass],
            backOrderCost: this.lobby.settings.back_order_cost[uClass],
            additionalCost: this.lobby.settings.additional_cost[uClass],
            startQueue: this.lobby.settings.start_order_queue[uClass],
          })
          nextId += 1
          if (uClass > maxClassNum) maxClassNum=uClass;
        }
      } catch (e) {
        //TODO: show error to user
      }
      maxRounds = this.lobby.settings.max_rounds;
      resourceBasicPrice = this.lobby.settings.resource_basic_price;
      showStats = this.lobby.settings.show_stats_for_users;
      unlimitedMoney = this.lobby.settings.unlimited_money;
      demand = this.lobby.settings.demand;
      supply = this.lobby.settings.supply;

      if(this.isTemplate) {
        maxPlayers = this.lobby.max_players;
        generateCode = this.lobby.code_use_times
        publicLobby = this.lobby.public;
        if(this.lobby.password)
          password = this.lobby.password;
      }
    }

    return {
      classes: classes,
      demand: demand,
      supply: supply,
      resourceBasicPrice: resourceBasicPrice,
      maxRounds: maxRounds,
      showStats: showStats,
      unlimitedMoney: unlimitedMoney,
      canDismiss: true,
      nextClassNum: maxClassNum,
      nextClassId: nextId,
      maxPlayers: maxPlayers,
      generateCode: generateCode,
      codeUseTimes: codeUseTimes,
      publicLobby: publicLobby,
      password: password,
      lobby: lobby
    }
  },
  methods: {
    saveSettings() {
      let settings = {
        demand_style: this.demand,
        supply_style: this.style,
        max_rounds: this.maxRounds,
        show_stats_for_users: this.showStats,
        unlimited_money: this.unlimitedMoney,
        resource_basic_price: this.resourceBasicPrice,
        user_classes: [],
        start_order_queue: {},
        resource_price: {},
        start_money: {},
        start_magazine: {},
        transport_cost: {},
        magazine_cost: {},
        fix_order_cost: {},
        back_order_cost: {},
        additional_cost: {},
      };

      for (let uClass in this.classes) {
        settings.user_classes.push(uClass.class);
        settings.start_order_queue[uClass.class] = uClass.startQueue
        settings.resource_price[uClass.class] = uClass.resourcePrice
        settings.start_money[uClass.class] = uClass.startMoney
        settings.start_magazine[uClass.class] = uClass.startMagazine
        settings.transport_cost[uClass.class] = uClass.transportCost
        settings.magazine_cost[uClass.class] = uClass.magazineCost
        settings.fix_order_cost[uClass.class] = uClass.fixOrderCost
        settings.back_order_cost[uClass.class] = uClass.backOrderCost
        settings.additional_cost[uClass.class] = uClass.additionalCost
      } 

      console.log("lobby: ", this.lobby)
      this.lobby.settings = settings;
      if(this.isTemplate) {
        this.lobby.max_players = this.maxPlayers;
        this.lobby.code_use_times = this.generateCode;
        this.lobby.public = this.publicLobby;
        if (this.password != null) {
          this.lobby.password = this.password
        }
      }
      this.update(this.lobby)
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
}
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