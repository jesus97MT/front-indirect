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
<script>
import { mapGetters, mapActions } from "vuex";
import ProfileForm from "@/components/ProfileForm.vue";
export default {

    components: {
        ProfileForm
  },
  computed: {
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