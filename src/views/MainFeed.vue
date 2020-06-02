<template>
  <div>
    <div class="home" v-for="indirect in indirects" v-bind:key="indirect.id">
      <Indirect
        :indirect="indirect"
        :avatars="avatars"
        :type="true"
      />
    </div>
        <v-btn
      dark
      fixed
      bottom
      right
      fab
      @click="onAddIndirect"
    >
      <v-icon>edit</v-icon>
    </v-btn>
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
      avatars: "getIndirectsAvatars",
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
    }
  },
  data() {
    return {
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
