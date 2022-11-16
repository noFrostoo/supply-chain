<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-grid class="container">
        <ion-col>
          <ion-row class="griditem">
            <ion-col>
              <ion-item>
                <ion-label position="floating">Max Rounds</ion-label>
                <ion-input type="number" placeholder="Enter text"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Show stats to users</ion-label>
                <ion-checkbox></ion-checkbox>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Unlimited money</ion-label>
                <ion-checkbox></ion-checkbox>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button @click="setOpen('settings', true)" id="open-modal" expand="block" >User Classes</ion-button>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label> </ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-row>
                <ion-button @click="setOpen('resourcePrice', true)">Set resource prices</ion-button>
                <ion-button @click="setOpen('startMoney', true)">Set start money</ion-button>
                <ion-button @click="setOpen('startMagazine', true)">Set start magazine</ion-button>
                <ion-button @click="setOpen('transportCost', true)">Set transport cost</ion-button>
              </ion-row>
              <ion-row>
                <ion-button @click="setOpen('fixOrderCost', true)">Set fix order cost</ion-button>
                <ion-button @click="setOpen('backOrderCost', true)">Set back order cost</ion-button>
                <ion-button @click="setOpen('additionalCost', true)">Set additional cost</ion-button>
              </ion-row>
              <ion-row>
                <ion-button @click="setOpen('startQueue', true)">Set order queue</ion-button>
                <ion-button @click="setOpen('demand', true)">Set demand style</ion-button>
                <ion-button @click="setOpen('supply', true)">Set supply style</ion-button>
              </ion-row>
            </ion-col>
            <ion-col>
              <p
                v-for="uClass in classes"
                :key="uClass"
              >

              </p>
            </ion-col>
          </ion-row>
        </ion-col>

      </ion-grid>

      <ion-modal :is-open="modalsOpen['settings']">
        <ion-header>
          <ion-toolbar>
            <ion-title>User Classes</ion-title>
            <ion-buttons @click="addClass()" slot="end">
              <ion-button >Add</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button @click="setOpen('settings', false)">Close</ion-button>
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

      <ion-modal :is-open="modalsOpen['resourcePrice']">
        <ion-header>
        <ion-toolbar>
            <ion-title>Resource Price</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('resourcePrice', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('resourcePrice', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
        </ion-content>
    </ion-modal>
      
    <ion-modal :is-open="modalsOpen['startMoney']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('startMoney', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('startMoney', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['startMagazine']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('startMagazine', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('startMagazine', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['startMagazine']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('startMagazine', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('startMagazine', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['transportCost']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('transportCost', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('transportCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['magazineCost']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('magazineCost', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('magazineCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['fixOrderCost']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('fixOrderCost', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('fixOrderCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['backOrderCost']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('backOrderCost', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('backOrderCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['additionalCost']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('additionalCost', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue('additionalCost', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['startQueue']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('startQueue', false)">Close</ion-button>
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
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" @ionInput="changeValue('startQueue', uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['demand']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('demand', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>demand</p>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalsOpen['supply']">
      <ion-header>
        <ion-toolbar>
            <ion-title>Start Money</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen('supply', false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>supply</p>
      </ion-content>
    </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonFab, IonFabButton, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { add } from 'ionicons/icons';
import ClassValueModalVue from '@/components/ClassValueModal.vue';

export default  defineComponent({
  name: 'SettingsPage',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonModal, IonGrid, IonRow, IonCol },  
  data() {
    return {
      modalsOpen: {
        "class": false,
        "resourcePrice": false,
        "startMoney": false,
        "startMagazine": false,
        "transportCost": false,
        "magazineCost": false,
        "fixOrderCost": false,
        "backOrderCost": false,
        "additionalCost": false,
        "startQueue": false,
        "demand": false,
        "supply": false
      },
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
        demand: {},
        supply: {}
      }],
      nextClassNum: 2,
      nextClassId: 2
    }
  },
  methods: {
      setOpen(modal, isOpen) {
        console.log(modal, isOpen)
        this.modalsOpen[modal] = isOpen;
        console.log(this.modalsOpen)
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
    return { add }
  }
})
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

.griditem {
  display: flex;
  align-items: center;
  justify-content: center;
  background:brown;
}

</style>