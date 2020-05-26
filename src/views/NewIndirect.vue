<template>
  <Indirect
    :type="false"
    :mutualList="mutualListParsed"
  ></Indirect>
</template>
<script >
//import { mapGetters, mapActions, mapState } from "vuex";
import Indirect from "@/components/Indirect.vue";
import { mapGetters, mapActions } from "vuex";

let mutualListParsed = [];


export default {
  components: {
      Indirect
  },
  computed: {
  ...mapGetters("user", {
      mutualList: "getMutualList"
    })
  },
  watch: {
    mutualList(c,c1) {
      this.mutualList.forEach(user => {
        const data = { text: user.userId, value: user.userUID }
        mutualListParsed.push(user.userId);
      });
    }
  },
  mounted() {
    const data = { userId: null};

    this.findUserMutuals(data)
  },

  methods: {
    ...mapActions("user", ["findUserMutuals"]),
  },
  data() {
    return {
    };
  }
};
</script>