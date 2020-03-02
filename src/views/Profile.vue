<template>
  <div>
    <ProfileForm
        :user.sync="ownProfile? user : userFind"
        :ownProfile.sync="ownProfile"
        @onSaveData="onSaveData"
        @onCancelEdit="onCancelEdit"
    />
    
  </div>
</template>
<script >
import { mapGetters, mapActions, mapState } from "vuex";
import ProfileForm from "@/components/ProfileForm.vue";
export default {
    components: {
        ProfileForm
  },
  computed: {
      ...mapState({
      account: state => state.account,
    }),
    ...mapGetters("user", {
      user: "getUserData",
      userFind: "getPublicProfile"
    })
  },
  mounted() {
    const userId = this.$route.params.id;
    if (userId) {
        console.log(this.account.status.loggedIn)
      this.ownProfile = false;
      this.findPublicProfile(userId);
    }
  },
  methods: {
    ...mapActions("user", [
      "saveUserData",
      "resetUserData",
      "findPublicProfile"
    ]),
    onSaveData() {
      this.saveUserData(this.user);
    },
    onCancelEdit() {
      this.resetUserData();
    }
  },
  data() {
    return {
      ownProfile: true
    };
  }
};
</script>