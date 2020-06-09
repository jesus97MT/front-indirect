<template>
  <v-card
    class="mx-auto"
    width="100%"
    :style="`border:0!important;  ${this.$vuetify.theme.themes.light.primary}!important`"
    tile
    @click="$router.push(`/profile/${user.userId}`);"
    :ripple="false"
  >
    <v-list-item three-line>
      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="avatars && user && user.userUID && avatars[user.userUID] || defaultPic"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <div style="display:flex; justify-content: space-between">
          <div class="overline mb-4">@{{user.userId}}</div>
          <v-btn
            v-if="!isMyProfile()"
            :color="isFollowing() ? 'error' : 'primary'"
            v-on:click.stop="onFollowButton()"
          >{{isFollowing() ? "Unfollow" : "Follow"}}</v-btn>
        </div>

        <v-list-item-title class="headline mb-1">{{user.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FollowCard extends Vue {
  @Prop() private user!: any;
  @Prop() private myUser!: any;
  @Prop() private avatars!: any;

  private defaultPic =
    "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";

  isFollowing() {
    const isFollowing = this.myUser.following.find(
      (userUID: string) => userUID == this.user.userUID
    );
    return !!isFollowing;
  }

  isMyProfile() {
    return this.myUser.userUID === this.user.userUID;
  }

  onFollowButton() {
    const isFollowing = this.isFollowing();
    const data = { type: isFollowing, userUID: this.user.userUID };
    this.$emit("onFollowButton", data);
  }
}
</script>