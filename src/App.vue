<template>
  <Suspense>
  <ion-app>
    <ion-router-outlet main />
  </ion-app>
  </Suspense>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  async beforeMount() {
    await this.$store.dispatch("actionCheckLoggedIn")
  }
});
</script>

<!-- <template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
 -->