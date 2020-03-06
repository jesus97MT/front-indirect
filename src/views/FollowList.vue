<template>
  <div>
    hola
  </div>
</template>
<script >
import { mapGetters, mapActions, mapState } from "vuex";
//import ProfileForm from "@/components/ProfileForm.vue";

export default {
    /*
  components: {
    ProfileForm
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    ...mapGetters("user", {
      user: "getUserData",
      userFind: "getPublicProfile"
    })
  },
  mounted() {
    const userId = this.$route.params.id;
    if (userId) {
      this.ownProfile = false;
      this.findPublicProfile(userId);
    }
  },
  methods: {
    ...mapActions("user", [
      "saveUserData",
      "resetUserData",
      "findPublicProfile",
      "followUser",
      "unFollowUser",
    ]),
    onSaveData() {
      this.saveUserData(this.user);
    },
    onCancelEdit() {
      this.resetUserData();
    },
    onFollow() {
      if (this.userFind && this.userFind.userUID)
        this.followUser(this.userFind.userUID);
    },
    onUnFollow() {
      if (this.userFind && this.userFind.userUID)
        this.unFollowUser(this.userFind.userUID);
    }
  },
  data() {
    return {
      ownProfile: true
    };
  }*/
};

</script>