<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>روی جعبه</v-tab>
      <v-tab>پشت جعبه</v-tab>
      <v-tab>بالای کشو</v-tab>
      <v-tab v-if="another">پایین کشو</v-tab>
      <v-tab>تصویر نهایی</v-tab>
      <v-tab>ثبت و پرداخت</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <front :storedType=$store.getters.getType />
      </v-tab-item>
      <v-tab-item>
        <back :storedType=$store.getters.getType />
      </v-tab-item>
      <v-tab-item>
        <top :storedType=$store.getters.getType v-on:another-one="another = true" />
      </v-tab-item>
      <v-tab-item v-if="another">
        <bottom :storedType=$store.getters.getType />
      </v-tab-item>
      <v-tab-item>
        <box-view :storedType=$store.getters.getType />
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import BoxView from '~/components/BoxView.vue'
import Top from '~/components/kebrit-photo/Top.vue'
import Front from '~/components/kebrit-photo/Front'
import Back from '~/components/kebrit-photo/Back'
import Bottom from '~/components/kebrit-photo/Bottom.vue'
  export default {
    components: {
      BoxView,
        Top,
        Back ,
        Front,
        Bottom
    },
    data() {
      return {
        tab: 0 ,
        another: false
      }
    },
    mounted () {
      // this.$vuetify.theme.dark = false;
      // window.onbeforeunload = function(e) {
      //   return "Don't leave";
      // };
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>