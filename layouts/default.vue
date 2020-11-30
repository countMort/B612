<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        <v-snackbar
          v-model="snackbar_show"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
          :top="snackbar.top"
          :bottom="snackbar.bottom"
          :left="snackbar.left"
          :right="snackbar.right"
          :multi-line="snackbar.multiLine"
          :vertical="snackbar.vertical"
        >
          <v-btn block text class="ma-0">
            <v-icon left>{{ snackbar.icon }}</v-icon>
            <span v-html="snackbar.text"></span>
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { EventBus } from '@/utils/event-bus'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      snackbar: {
        text: "",
        bottom: true,
        top: false,
        right: true,
        left: false,
        icon: "",
        timeout: 5000,
        miltiLine: false,
        vertical: false,
      },
      snackbar_show: false ,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      title: 'Vuetify.js'
    }
  } ,
  created() {
  } ,
  mounted () {
    EventBus.$on("setSnack", (data) => {
      if (typeof data === "string") {
        this.snackbar.text = data;
      } else {
        this.snackbar.text = data.text;
        this.snackbar.color = data.color;
        this.snackbar.multiLine = data.multiLine;
        this.snackbar.vertical = data.vertical;
        if (data.color == "red") this.snackbar.icon = "mdi-alert";
        else if (data.color == "green") this.snackbar.icon = "mdi-check";
      }
      this.snackbar_show = true;
    });
  },
}
</script>
