<template>
  <Indirect
    :type="false"
    :mutualList="mutualList"
  ></Indirect>
</template>
<script >
//import { mapGetters, mapActions, mapState } from "vuex";
import Indirect from "@/components/Indirect.vue";
import { mapGetters, mapActions } from "vuex";


export default {
  components: {
      Indirect
  },
  computed: {
  ...mapGetters("user", {
      mutualList: "getMutualList"
    })
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