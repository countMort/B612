<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      clipped
      :mobile-breakpoint="800"
    >
      <v-row class="mt-2">
        <v-btn
        text
        to="/cart"
        :class="getCartLength > 0 && 'buzz'"
        class="mt-2 white--text mx-auto">
          <v-badge overlap :badge="getCartLength" left>
            <template v-slot:badge>
              {{getCartLength}}
            </template>
            <v-icon>mdi-cart-outline</v-icon>
            سبد خرید
          </v-badge>
        </v-btn>
        <!-- <v-avatar v-for="product in getCart" :key="product._id" size="40" >
              <img :src="product.photo">
        </v-avatar> -->
      </v-row>
      <v-list>
        <v-list-item
          v-for="(item, i) in routes"
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
      :clipped-left="true"
      fixed
      app
    >
      <v-app-bar-nav-icon>
        <v-btn icon nuxt to="/">
          <v-icon>
            mdi-light-switch
          </v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <template v-slot:extension>
        <template>
          <v-btn color="transparent" class="mt-2 btns" nuxt to="/Login">
            ورود
            <v-icon class="mr-2" size="15">
              mdi-account
            </v-icon>
          </v-btn>
          <v-btn color="transparent" class="mt-2 btns" nuxt to="/Signup">
            عضویت
            <v-icon class="mr-2" size="15">
            mdi-account-plus
            </v-icon>
          </v-btn>
        </template>
      </template> -->
      <template v-slot:extension>
          <template v-if="!$store.state.auth.loggedIn">
            <v-btn color="transparent" class="mt-2 btns" nuxt to="/Login">
              ورود
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>
            <v-btn color="transparent" class="mt-2 btns" nuxt to="/Signup">
              عضویت
              <v-icon>
              mdi-account-plus
              </v-icon>
            </v-btn>
          </template>
          <template v-if="$store.state.auth.loggedIn">
            <v-btn nuxt to="/address" color="transparent" class="mt-2 btns">
              <v-icon>mdi-truck-delivery-outline</v-icon>
              &nbsp;{{$store.state.auth.user.address ? $store.state.auth.user.address.fullName : 'به کجا ارسال شود'}}
            </v-btn>
            <v-btn nuxt to="/orders" color="transparent" class="mt-2 btns">
            <v-icon>mdi-newspaper-variant</v-icon>
            &nbsp;سفارشات من
            </v-btn>
          </template>
        </template>
        <v-spacer></v-spacer>
        <v-tooltip v-if="$store.state.auth.loggedIn" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              nuxt
              to="/Profile"
              icon
            >
            <v-icon>mdi-account-cog</v-icon>
            </v-btn>
          </template>
          <span>ویرایش پروفایل</span>
        </v-tooltip>
        <v-tooltip v-if="$store.state.auth.loggedIn" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="logout"
              icon
            >
            <v-icon>mdi-door-closed</v-icon>
            </v-btn>
          </template>
          <span>خروج</span>
        </v-tooltip>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
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
      app
      absolute
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { EventBus } from '@/utils/event-bus'
import routeGenerator from '@/routes'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      drawer: false,
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
      routes: [],
      title: 'B-612'
    }
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
        else if (data.color == "green" || data.color == "success") this.snackbar.icon = "mdi-check";
      }
      this.snackbar_show = true;
    });
    this.routes = routeGenerator(this.$auth.user.role)
  },
  computed: {
    ...mapGetters(["getCartLength" , "getCart"])
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  },
}
</script>
