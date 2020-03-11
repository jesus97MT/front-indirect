<template>
  <div>
    hola
    <ul v-for="user in userList" v-bind:key="user.userUID">
        <li>{{user.email + " / " + user.name }}</li>
    </ul>
  </div>
</template>
<script >
import { mapGetters, mapActions, mapState } from "vuex";
//import ProfileForm from "@/components/ProfileForm.vue";

export default {
  components: {
    //ProfileForm
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    ...mapGetters("user", {
      userList: "getFollowList"
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
    console.log(this.$route.params.id);
    const userId = this.$route.params.id || null;
    if (userId) this.ownList = false;
    const data = { userId, typeList: this.typeList };

    this.findUserFollowList(data);
  },
  methods: {
    ...mapActions("user", ["findUserFollowList", "followUser", "unFollowUser"])

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