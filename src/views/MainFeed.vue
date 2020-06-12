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
      <v-alert
        dense
        text
        type="info"
        color="primary"
        class="my-6 mx-6"
      >There are no indirects, follow new users or write your indirect!</v-alert>
    </div>
    <v-btn color="primary" fixed bottom right fab @click="onAddIndirect">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="700">
      <Indirect :indirect="indirects[dialogIndex]" :avatars="avatars" :type="true" />
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
   watch: {
    indirects() {
      this.loadNewIndirects = false;
      this.countScroll++;
    }
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
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    }
  },
  data() {
    return {
      dialog: false,
      dialogIndex: null,
      loadNewIndirects: false,
      countScroll: -1,
      directionLoadIndirects: false,//false -> down || true -> up
      dateLoadIndirects: null //ToDo cargar indirects dependiendo si es scrolleando para abajo se buscan todos los indirects antiguos de esa fecha y si es hacia arriba/nuevos pues apartir de esa fecha para no tener mezclado los datos
    };
  },
  created() {
    window.addEventListener("scroll", () => {
      //console.log("scorll")
      if (!this.loadNewIndirects && this.bottomVisible()) {
        this.loadNewIndirects = true;
        this.loadIndirects(this.countScroll + 1);
        console.log("load new indirects")
      }
    });
    /*const token = localStorage.getItem('token');
    this.socket = io.connect("http://localhost:8000", {
        query: {op:"token", token}
    });*/
  },
  mounted() {
    this.dateLoadIndirects = new Date();
    this.loadIndirects();
  }
};
</script>
