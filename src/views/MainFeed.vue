<template>
  <div>
    <button v-on:click="clickButton">connectE</button>
    <div class="home" v-for="indirect in indirects" v-bind:key="indirect.id">
      <Indirect :text="indirect.text" :date="indirect.date" :userImg="indirect.userImg"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Indirect from "@/components/Indirect.vue";
import io from "socket.io-client"

export default {
  name: "MainFeed",
  components: {
    Indirect
  },
  methods: {
      clickButton: function (data) {
      }
  },
  data() {
    return {
      socket: {},

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
    this.socket = io("http://localhost:8000")
  },
  mounted() {
    this.socket.on("holo", data => {
      console.log(data)
    })
  }
};
</script>
