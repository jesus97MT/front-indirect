<template>
  <div>
    <ProfileForm
      :user.sync="ownProfile? user.data : userFind.data"
      :userFollowing.sync="!ownProfile && user && user.data && user.data.following || null"
      :ownProfile.sync="ownProfile"
      :avatar.sync="user.avatar"
      @onSaveData="onSaveData($event)"
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
      "unFollowUser",
      "saveNewProfilePic"
    ]),
    onSaveData(newImage) {
      this.saveUserData(this.user.data);
      if(newImage) {
        this.saveNewProfilePic(newImage)
      }
    },
    onCancelEdit() {
      this.resetUserData();
    },
    onFollow() {
      if (this.userFind.data && this.userFind.data.userUID)
        this.followUser(this.userFind.data.userUID);
    },
    onUnFollow() {
      if (this.userFind && this.userFind.data.userUID)
        this.unFollowUser(this.userFind.data.userUID);
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