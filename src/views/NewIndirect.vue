<template>
  <div class="ml-sm-8 mt-sm-8 mt-0" style="width:100%; max-width:800px">
    <Indirect
      class="mt-6 mx-4 mx-sm-0"
      :type="false"
      :mutualList="mutualListParsed"
      :avatars="avatars"
      @onSendIndirect="onSendIndirect($event)"
    ></Indirect>
  </div>
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
      mutualList: "getMutualListData",
      avatars: "getMutualListAvatars"
    })
  },
  watch: {
    mutualList(c, c1) {
      this.mutualList.forEach(user => {
        const data = {
          text: `@${user.userId}`,
          value: user.userUID,
          avatar: user.profilePicUrl
        };
        this.mutualListParsed.push(data);
      });
    }
  },
  mounted() {
    const data = { userId: null };

    this.findUserMutuals(data);
  },

  methods: {
    ...mapActions("user", ["findUserMutuals"]),
    ...mapActions("indirect", ["addIndirect"]),

    onSendIndirect(indirect) {
      this.addIndirect(indirect);
      this.$router.push('/');
    }
  },
  data() {
    return {
      mutualListParsed: []
    };
  }
};
</script>