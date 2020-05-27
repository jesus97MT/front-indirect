<template>
  <Indirect
    :type="false"
    :mutualList="mutualListParsed"
    @onSendIndirect="onSendIndirect($event)"
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
  watch: {
    mutualList(c,c1) {
      this.mutualList.forEach(user => {
        const test = {text: "dada", value:31231, avatar:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"}
        const test2 = {text: "dad33a", value:1111, avatar:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"}
        const test3 = {text: "da33da", value:22222, avatar:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"}

        this.mutualListParsed.push(test);
        this.mutualListParsed.push(test2);
        this.mutualListParsed.push(test3);


        const data = { text: `@${user.userId}`, value: user.userUID, avatar: user.profilePicUrl }
        this.mutualListParsed.push(data);
      });
    }
  },
  mounted() {
    const data = { userId: null};

    this.findUserMutuals(data)
  },

  methods: {
    ...mapActions("user", ["findUserMutuals"]),
    onSendIndirect(indirect) {
      console.log(indirect)
    }
  },
  data() {
    return {
      mutualListParsed: []
    };
  }
};
</script>