<template>
    <ion-content>
    <ion-modal :is-open="modalsOpen">
        <ion-header>
        <ion-toolbar>
            <ion-title>Resource Price</ion-title>
            <ion-buttons slot="end">
            <ion-button @click="setOpen(modalName, false)">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
        <ion-list>
        <ion-item 
            v-for="uClass in classes"
            :key="uClass.id"
            :id="uClass.id" 
            :ref="`modalName${uClass.id}`"
        >
            <ion-label position="fixed">Class name: {{uClass.class}}</ion-label>
            <ion-input :value="uClass.class" type="number" @ionInput="changeValue(modalName, uClass.id, $event.target.value)" ></ion-input>
        </ion-item>
        </ion-list>
        </ion-content>
    </ion-modal>
    </ion-content>
</template>

<script>
export default {
    props: ['modalsOpen', 'setOpen', 'modalName', 'changeValue', 'classes']
}
</script>

<style>

</style>