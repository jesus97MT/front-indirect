  
<template>
  <v-app id="sandbox">
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
        <v-list-item two-line to="/profile" :disabled="!(login.status && login.status.loggedIn)">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content >
            <v-list-item-title>{{login.status && login.status.loggedIn ? /*name + surname */ "Nombre Apellido"  : "User not logged"}}</v-list-item-title>
            <v-list-item-subtitle>{{login.status && login.status.loggedIn ? login.user : "Please log-in"}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider ></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
          :disabled="!(login.status && login.status.loggedIn)"
        >
          <v-list-item-icon>
            <v-icon :disabled="!(login.status && login.status.loggedIn)">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-title>Night Mode</v-list-item-title>
        <v-switch v-model="$vuetify.theme.dark" primary/>
      </v-list-item>
      <template v-slot:append v-if="login.status && login.status.loggedIn">
        <div class="pa-2">
          <v-btn block color="error" v-on:click="clickDisconect">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>Indirect</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { socketOperations } from "./socket/socket";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  mounted() {
    socketOperations.reconnect();
  },
  methods: {
    ...mapActions("login", ["logout"]),
    clickDisconect: function() {
      this.logout();
    }
  },
  computed: {
    ...mapState({
      login: (state: any) => state.login
    })
  },
  data: () => ({
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
      { title: "Home", icon: "dashboard", route:"/" },
      { title: "Chat", icon: "gavel",route:"/messages" },
      { title: "Account", icon: "account_box", route:"/test" }
    ]
  })
});
</script>