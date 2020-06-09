  
<template>
  <v-app id="sandbox" light :style="`background-color:${this.$vuetify.theme.themes.light.base}`">
    <spinner v-if="isLoading" :isLoading="isLoading"></spinner>

    <div v-else>
      <HeaderNav
        :user.sync="user"
        :account.sync="account"
        @clickDisconect="clickDisconect"
        @onEnterSearch="onEnterSearch($event)"
      >
      </HeaderNav>

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
import HeaderNav from "@/components/HeaderNav.vue";

export default Vue.extend({
  components: {
    Spinner,
    HeaderNav
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
        //console.error(error);
      }
    );
  },
  methods: {
    ...mapActions("account", ["logout"]),
    clickDisconect: function() {
      this.logout();
    },
    onEnterSearch(userId:string) {
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
    search: {
      isActive: false,
      text: ""
    }
  })
});
</script>