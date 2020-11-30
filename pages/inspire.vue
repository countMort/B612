<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>روی جعبه</v-tab>
      <v-tab>پشت جعبه</v-tab>
      <v-tab>کنار جعبه</v-tab>
      <v-tab>تصویر نهایی و پرداخت</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Editor :num=1 />
      </v-tab-item>
      <v-tab-item>
        <Editor :num=2 />
      </v-tab-item>
      <v-tab-item>
        <Editor :num=3 />
      </v-tab-item>
      <v-tab-item>
        <box-view />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Editor from '@/components/editor/index'
import BoxView from '~/components/BoxView.vue'
// import FullEditor from '@/components/FullEditor'
  export default {
    components: {
      Editor,
      BoxView,
      // FullEditor
    },
    data() {
      return {
        tab: 0
      }
    },
    mounted () {
      // this.$vuetify.theme.dark = false;
    },
  }
</script>

<style scoped>

</style>