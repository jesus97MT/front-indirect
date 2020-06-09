<template>
  <div>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
      :style="`background-color:${this.$vuetify.theme.themes.light.base}`"
    >
      <v-list dense nav class="py-0">
        <v-list-item
          two-line
          to="/profile"
          :disabled="!(account.status && account.status.loggedIn)"
        >
          <v-list-item-avatar>
            <img :src="user.avatar ? user.avatar : defaultPic" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{account.status && account.status.loggedIn ? user.data.userId : "User not logged"}}</v-list-item-title>
            <v-list-item-subtitle>{{account.status && account.status.loggedIn ? user.data.email : "Please log-in"}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
          :disabled="!(account.status && account.status.loggedIn) || item.disabled"
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
      <v-list-item disabled>
        <v-list-item-title disabled>Night Mode</v-list-item-title>
        <v-switch disabled v-model="$vuetify.theme.dark" primary />
      </v-list-item>
      <template v-slot:append v-if="account.status && account.status.loggedIn">
        <div class="pa-2">
          <v-btn block color="error" v-on:click="clickDisconect">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      v-if="account.status && account.status.loggedIn"
      :clipped-left="primaryDrawer.clipped"
      app
      :extended="false"
      color="primary"
      elevation="0"
      :style="`border-bottom:1px solid ${this.$vuetify.theme.themes.light.separator}!important`"
    >
      <v-app-bar-nav-icon
        v-if="navOptions[$route.fullPath.split('/')[1] || 'default']['navigationDrawer']"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-btn v-else icon @click="onRightClick(navOptions[$route.fullPath.split('/')[1] || 'default']['methodLeft'])">
        <v-icon>{{ navOptions[$route.fullPath.split('/')[1] || "default"]["iconLeft"] }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="!search.isActive" style="color:white">
        {{navOptions && navOptions[$route.fullPath.split('/')[1] || "default"]["title"] }}</v-toolbar-title>
      <v-text-field v-else v-model="search.text" v-on:keyup.enter="onEnterSearch"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn v-if="navOptions[$route.fullPath.split('/')[1] || 'default']['iconRight']" icon @click="onRightClick(navOptions[$route.fullPath.split('/')[1] || 'default']['methodRight'])">
        <v-icon>{{ navOptions[$route.fullPath.split('/')[1] || "default"]["iconRight"] }}</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HEADER_NAV } from "../constants/header-nav";

@Component
export default class HeaderNav extends Vue {
  @Prop() private account!: any;
  @Prop() private user!: any;

  private navOptions = HEADER_NAV;

  private primaryDrawer = {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    }

    private items = [
      { title: "Home", icon: "dashboard", route: "/", disabled:false },
      { title: "Chat (not yet)", icon: "chat", route: "/messages", disabled:true },
      { title: "Account", icon: "account_box", route: "/profile", disabled:false }
    ];

    private search = {
      isActive: false,
      text: ""
    }

    private defaultPic = "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";

    clickDisconect() {
      this.$emit("clickDisconect");
    }

    onEnterSearch() {
      const userId = this.search.text;
      this.$emit("onEnterSearch", userId);
    }

    onSearch() {
      this.search.isActive = !this.search.isActive
    }

    onRightClick(f) {
      this[f]();
    }

    returnBack() {
      this.$router.go(-1);
    }
    
    onHome() {
      this.$router.push("/");
    }

    
}
</script>