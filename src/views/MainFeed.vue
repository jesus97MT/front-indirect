<template>
  <div class="ml-sm-8 mt-sm-8 mt-0" style="width:100%; max-width:800px">
    <div
      class="home mt-6 mx-4 mx-sm-0"
      v-for="(indirect, index) in indirects"
      v-bind:key="indirect.id"
    >
      <Indirect
        @onClickIndirect="onClickIndirect($event)"
        :indirect="indirect"
        :avatars="avatars"
        :type="true"
        :index="index"
      />
    </div>
    <div v-if="!indirects.length">
      <v-alert dense text type="info" color="primary" class="my-6 mx-6">
      There are no indirects, follow new users or write your indirect!
    </v-alert>
    </div>
    <v-btn color="primary" fixed bottom right fab @click="onAddIndirect">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="700">
      <Indirect
        :indirect="indirects[dialogIndex]"
        :avatars="avatars"
        :type="true"
      />
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Indirect from "@/components/Indirect.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainFeed",
  components: {
    Indirect
  },
  computed: {
    ...mapGetters("indirect", {
      indirects: "getIndirectsData",
      avatars: "getIndirectsAvatars"
    })
  },
  methods: {
    ...mapActions("account", ["logout"]),
    ...mapActions("indirect", ["loadIndirects"]),

    clickDisconect: function(data) {
      this.logout();
    },
    onAddIndirect() {
      this.$router.push("/add");
    },

    onClickIndirect(index) {
      this.dialog = true;
      this.dialogIndex = index;
    }
  },
  data() {
    return {
      dialog: false,
      dialogIndex: null
    };
  },
  created() {
    /*const token = localStorage.getItem('token');
    this.socket = io.connect("http://localhost:8000", {
        query: {op:"token", token}
    });*/
  },
  mounted() {
    this.loadIndirects();
  }
};
</script>
