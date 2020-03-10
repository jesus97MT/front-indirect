<template>
  <div>
    <ProfileForm
      :user.sync="ownProfile? user : userFind"
      :userFollowing.sync="!ownProfile && user && user.following || null"
      :ownProfile.sync="ownProfile"
      @onSaveData="onSaveData"
      @onCancelEdit="onCancelEdit"
      @onFollow="onFollow"
      @onUnFollow="onUnFollow"
      @onFollowersList="onFollowersList"
      @onFollowingList="onFollowingList"
    />
  </div>
</template>
<script >
import { mapGetters, mapActions, mapState } from "vuex";
import ProfileForm from "@/components/ProfileForm.vue";
var onDestroy;

export default {
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
    const promise = new Promise(function(resolve, reject) {
      onDestroy = resolve;
    });

    if (userId) {
      this.ownProfile = false;
      this.findPublicProfile({ userId, promise });
    } else {
      this.getOwnUserdata(promise);
    }
  },

  destroyed() {
    onDestroy();
  },
  methods: {
    ...mapActions("user", [
      "getOwnUserdata",
      "saveUserData",
      "resetUserData",
      "findPublicProfile",
      "followUser",
      "unFollowUser"
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
    },
    onFollowersList() {
      const userId = this.$route.params.id;
      var url = "/followers";

      if (!this.ownProfile && userId) url += `/${userId}`;

      this.$router.push(url);
    },
    onFollowingList() {
      const userId = this.$route.params.id;
      var url = "/following";

      if (!this.ownProfile && userId) url += `/${userId}`;
      this.$router.push(url);
    }
  },
  data() {
    return {
      ownProfile: true
    };
  }
};
</script>