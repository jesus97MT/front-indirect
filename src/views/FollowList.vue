<template>
  <div  class="ml-sm-8 mt-sm-8 mt-0"
      style="width:100%; max-width:800px">
    
    <div v-for="user in userList" v-bind:key="user.userUID" class="mt-6 mx-4 mx-sm-0">
      <FollowCard
        :user.sync="user"
        :myUser.sync="myUser.data"
        :avatars="avatars"
        @onFollowButton="onFollowButton"
      ></FollowCard>
    </div>
  </div>
</template>
<script >
import { mapGetters, mapActions, mapState } from "vuex";
import FollowCard from "@/components/FollowCard.vue";

export default {
  components: {
    FollowCard
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    ...mapGetters("user", {
      userList: "getFollowListData",
      avatars: "getFollowListAvatars",
      myUser: "getUserData"
    })
  },
  mounted() {
    const path = this.$route.path;
    if (path.includes("following")) {
      this.typeList = "following";
    } else if (path.includes("followers")) {
      this.typeList = "followers";
    }

    //
    const userId = this.$route.params.id || null;
    if (userId) this.ownList = false;
    const data = { userId, typeList: this.typeList };

    this.findUserFollowList(data);
  },
  methods: {
    ...mapActions("user", ["findUserFollowList", "followUser", "unFollowUser"]),

    onFollowButton(data) {
      const typeFollow = data.type;
      const userUID = data.userUID;
      if (typeFollow) {
        this.unFollowUser(userUID);
      } else {
        this.followUser(userUID);
      }
    }
    /*onFollow() {
      if (this.userFind && this.userFind.userUID)
        this.followUser(this.userFind.userUID);
    },
    onUnFollow() {
      if (this.userFind && this.userFind.userUID)
        this.unFollowUser(this.userFind.userUID);
    }*/
  },
  data() {
    return {
      ownList: true,
      typeList: ""
    };
  }
};
</script>