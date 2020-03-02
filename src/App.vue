  
<template>
  <v-app id="sandbox">
    <spinner v-if="isLoading" :isLoading="isLoading"></spinner>

    <div v-else>
      <v-navigation-drawer
        v-model="primaryDrawer.model"
        :clipped="primaryDrawer.clipped"
        :floating="primaryDrawer.floating"
        :mini-variant="primaryDrawer.mini"
        :permanent="primaryDrawer.type === 'permanent'"
        :temporary="primaryDrawer.type === 'temporary'"
        app
        overflow
      >
        <v-list dense nav class="py-0">
          <v-list-item
            two-line
            to="/profile"
            :disabled="!(account.status && account.status.loggedIn)"
          >
            <v-list-item-avatar>
              <img
                :src="user.profilePicUrl ? user.profilePicUrl : 'https://randomuser.me/api/portraits/men/81.jpg'"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{account.status && account.status.loggedIn ? user.userId : "User not logged"}}</v-list-item-title>
              <v-list-item-subtitle>{{account.status && account.status.loggedIn ? user.email : "Please log-in"}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.route"
            link
            :disabled="!(account.status && account.status.loggedIn)"
          >
            <v-list-item-icon>
              <v-icon :disabled="!(account.status && account.status.loggedIn)">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title>Night Mode</v-list-item-title>
          <v-switch v-model="$vuetify.theme.dark" primary />
        </v-list-item>
        <template v-slot:append v-if="account.status && account.status.loggedIn">
          <div class="pa-2">
            <v-btn block color="error" v-on:click="clickDisconect">Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="primaryDrawer.clipped" app :extended="false">
        <v-app-bar-nav-icon
          v-if="primaryDrawer.type !== 'permanent'"
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
        />
        <v-toolbar-title v-if="!search.isActive">Indirect</v-toolbar-title>
        <v-text-field v-else v-model="search.text" v-on:keyup.enter="onEnterSearch"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="search.isActive = !search.isActive">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <router-view :key="$route.fullPath" />
      </v-content>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { socketOperations } from "./socket/socket";
import { mapState, mapActions } from "vuex";
import router from "./router/index";
import Spinner from "@/components/Spinner.vue";

export default Vue.extend({
  components: {
    Spinner
  },
  mounted() {
    socketOperations.reconnect().then(
      data => {
        //To do quitar xd
        setTimeout(() => this.isLoading = false, 1000);
        //this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  },
  methods: {
    ...mapActions("account", ["logout"]),
    clickDisconect: function() {
      this.logout();
    },
    onEnterSearch() {
      const userId = this.search.text;
      const url = `/profile/${userId}`;
      router.push(url);
      this.search.isActive = false;
      this.search.text = "";
    }
  },
  computed: {
    ...mapState({
      account: (state: any) => state.account,
      user: (state: any) => state.user.user
    })
  },
  data: () => ({
    isLoading: true,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    },
    items: [
      { title: "Home", icon: "dashboard", route: "/" },
      { title: "Chat", icon: "gavel", route: "/messages" },
      { title: "Account", icon: "account_box", route: "/test" }
    ],
    search: {
      isActive: false,
      text: ""
    }
  })
});
</script>