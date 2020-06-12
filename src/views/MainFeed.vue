<template>
  <div class="ml-sm-8 mt-sm-8 mt-0" style="width:100%; max-width:800px">
    <pull-to :top-load-method="refreshIndirects" :top-config="topConfig">
      <!-- <v-btn @click="refreshIndirects("das")">refresh</v-btn> -->

      <div
        class="home mt-6 mx-4 mx-sm-0 mb-12"
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

      <div v-if="loadNewIndirects && countScroll > -1" class="d-flex justify-center mb-5">
        <v-progress-circular size="60" indeterminate color="primary"></v-progress-circular>
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
      
      <v-dialog v-model="dialog" max-width="700">
        <Indirect :indirect="indirects[dialogIndex]" :avatars="avatars" :type="true" />
      </v-dialog>
    </pull-to>
    <v-btn color="primary" fixed bottom right fab @click="onAddIndirect">
        <v-icon>edit</v-icon>
      </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import Indirect from "@/components/Indirect.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import PullTo from 'vue-pull-to'

 

export default {
  name: "MainFeed",
  components: {
    Indirect,
    PullTo
  },
  computed: {
    ...mapGetters("indirect", {
      indirects: "getIndirectsData",
      avatars: "getIndirectsAvatars"
    })
  },
  watch: {
    indirects() {
      if (this.directionLoadIndirects) {
        this.dateLoadIndirects = new Date().getTime() + 1000;
        this.promise('done')
      }
      this.loadNewIndirects = false;
      this.countScroll++;
    }
  },

  methods: {
    ...mapActions("account", ["logout"]),
    ...mapActions("indirect", ["loadIndirects"]),
    ...mapMutations("indirect", [
      "resetIndirectsData",
      "resetIndirectsAvatars"
    ]),

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
    },

    refreshIndirects(loaded) {
      this.directionLoadIndirects = true;
      this.loadIndirects({
        date: this.dateLoadIndirects,
        direction: this.directionLoadIndirects,
        countScroll: null
      });
      this.promise = loaded;
      
    },

    refresh(loaded) {
      //setTimeout(() => loaded('done'), 2000)
    }
  },
  data() {
    return {
      dialog: false,
      dialogIndex: null,
      loadNewIndirects: false,
      countScroll: -1,
      directionLoadIndirects: false, //false -> down || true -> up
      dateLoadIndirects: null, //ToDo cargar indirects dependiendo si es scrolleando para abajo se buscan todos los indirects antiguos de esa fecha y si es hacia arriba/nuevos pues apartir de esa fecha para no tener mezclado los datos
      topConfig: {
        pullText: 'Pull down to refresh', // The text is displayed when you pull down
        triggerText: 'Release to refresh', // The text that appears when the trigger distance is pulled down
        loadingText: 'Refreshing data', // The text in the load
        doneText: 'Data loaded', // Load the finished text
        failText: 'Error data', // Load failed text
        loadedStayTime: 400, // Time to stay after loading ms
        stayDistance: 50, // Trigger the distance after the refresh
        triggerDistance: 70 // Pull down the trigger to trigger the distance
      },
      promise: null
    };
  },
  created() {
    window.addEventListener("scroll", () => {
      //console.log("scorll")
      if (!this.loadNewIndirects && this.bottomVisible()) {
        this.loadNewIndirects = true;
        this.loadIndirects({
          date: this.dateLoadIndirects,
          direction: this.directionLoadIndirects,
          countScroll: this.countScroll + 1
        });
      }
    });
    /*const token = localStorage.getItem('token');
    this.socket = io.connect("http://localhost:8000", {
        query: {op:"token", token}
    });*/
  },
  mounted() {
    this.reset;
    this.dateLoadIndirects = new Date().getTime() + 1000;
    this.loadIndirects({
      date: this.dateLoadIndirects,
      direction: this.directionLoadIndirects,
      countScroll: null
    });
  },
  destroyed() {
    this.resetIndirectsData();
    this.resetIndirectsAvatars();
  }
};
</script>
<style>
.scroll-container {
  overflow-y: hidden!important;
}
</style>
