<template>
  <div>
    <div class="home" v-for="indirect in indirects" v-bind:key="indirect.id">
      <Indirect :text="indirect.text" :date="indirect.date" :user="indirect.user"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Indirect from "@/components/Indirect.vue";

export default {
  name: "MainFeed",
  components: {
    Indirect
  },
  data() {
    return {
      indirects: [
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          user: "paco"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          user: "jesus"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          user: "lucas"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          user: "pedro"
        },
        {
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "20/11/2019",
          user: "lucia"
        }
      ]
    };
  }
};
</script>
