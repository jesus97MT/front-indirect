<template>
  <div>
    <button v-on:click="clickButton">TEst</button>
    <button v-on:click="clickDisconect">Disconect</button>
    <div class="home" v-for="indirect in indirects" v-bind:key="indirect.id">
      <Indirect :text="indirect.text" :date="indirect.date" :userImg="indirect.userImg"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Indirect from "@/components/Indirect.vue";
import { socketOperations } from '../socket/socket'
import { mapState, mapActions } from 'vuex'

export default {
  name: "MainFeed",
  components: {
    Indirect
  },
  methods: {
    ...mapActions('login', ['logout']),
      clickButton: function (data) {
        this.socket.emit("getUserName", null);
      },
      clickDisconect: function(data) {
        this.logout();
      }
  },
  data() {
    return {
      socket: socketOperations.getSocket(),
      userConected:"eeee",

      indirects: [
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          userImg: "https://m.eldiario.es/cultura/persona-pixelada_EDIIMA20160915_0571_18.jpg"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          userImg: "https://m.eldiario.es/cultura/persona-pixelada_EDIIMA20160915_0571_18.jpg"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          userImg: "https://m.eldiario.es/cultura/persona-pixelada_EDIIMA20160915_0571_18.jpg"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          userImg: "https://m.eldiario.es/cultura/persona-pixelada_EDIIMA20160915_0571_18.jpg"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          userImg: "https://m.eldiario.es/cultura/persona-pixelada_EDIIMA20160915_0571_18.jpg"
        }
      ]
    };
  },
  created() {
    /*const token = localStorage.getItem('token');
    this.socket = io.connect("http://localhost:8000", {
        query: {op:"token", token}
    });*/
  },
  mounted() {
     this.socket.on("setUserName", data => {
      console.log(data)
    //   this.userConected = data
     })
  }
};
</script>
