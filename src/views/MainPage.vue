<template>
    <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Supply Chain</ion-title>
        </ion-toolbar>
      </ion-header> 
      <ion-grid class="container" >
        <ion-col>
            <ion-row >
                <ion-col size-lg="10" class="item-test">
                    <ion-searchbar animated="true" placeholder="Game name"></ion-searchbar>
                </ion-col>
                <ion-col  class="item-test"><p>xfafD</p></ion-col>
            </ion-row>
            <ion-row>
                <ion-col size-lg="10" class="item-test">
                    <ion-list>
                        <ion-list-header>
                            <ion-label>Games</ion-label>
                        </ion-list-header>
                        <ion-item lines="full">
                            <ion-label>Game Name</ion-label>
                            <ion-button slot="end" >Connect</ion-button>
                        </ion-item>
                    </ion-list>
                </ion-col>
            </ion-row>
        </ion-col>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
export default {

}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-test{
    background:brown;
}

</style>