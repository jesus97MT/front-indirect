<template>
  <div height="100%">
    <div
      class="mx-auto"
      max-width="434"
      height="45%"
      :style="`background: linear-gradient(to right, ${this.$vuetify.theme.themes.light.secondary} 30%, ${this.$vuetify.theme.themes.light.primary} 70%);`"
      align="center"
    >
      <v-row align="end" class="fill-height mx-0">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-sheet elevation="20" class="mx-auto" height="164" width="164" light>
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img :src="user && user.profilePicUrl || defaultPic"></v-img>
            </v-avatar>
          </v-sheet>
        </v-col>
        <v-col class>
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title" v-if="!editing">{{ user && user.userId }}</v-list-item-title>
              <v-list-item-title class="title" v-else>
                <v-text-field
                  v-if="user"
                  v-model="user.userId"
                  label="Nombre"
                  required
                  :readonly="!editing"
                  :disabled="!editing"
                ></v-text-field>
              </v-list-item-title>
              <v-list-item-subtitle>Madrid España</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </div>
    <div>
      <div
        class="mx-auto"
        max-width="434"
        height="45%"
        :style="`background: linear-gradient(to right, ${this.$vuetify.theme.themes.light.primary} 50%, ${this.$vuetify.theme.themes.light.secondary} 50%);`"
        align="center"
      >
        <v-row align="end" class="fill-height mx-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark class="pa-0">
            <v-col class="pa-0">
              <v-list-item class="pa-0" color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title
                    class="title"
                  >{{ user && user.followers && user.followers.length || 0 }}</v-list-item-title>
                  <v-list-item-subtitle>Followers</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title
                    class="title"
                  >{{ user && user.following && user.following.length || 0}}</v-list-item-title>
                  <v-list-item-subtitle>Following</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-list-item>
        </v-row>
      </div>
    </div>
    <div class="my-8 mx-12">
      <v-text-field
        v-if="ownProfile && user"
        v-model="user.email"
        label="E-mail"
        required
        :readonly="!editing"
        :disabled="true"
      ></v-text-field>
      <v-text-field
        v-if="user"
        v-model="user.name"
        label="Name"
        required
        :readonly="!editing"
        :disabled="!editing"
      ></v-text-field>
      <v-text-field
        v-if="user"
        v-model="user.surname"
        label="Surname"
        required
        :readonly="!editing"
        :disabled="!editing"
      ></v-text-field>

      <v-text-field
        v-if="user"
        v-model="user.date"
        label="Date"
        :readonly="!editing"
        :disabled="!editing"
        required
      ></v-text-field>
    </div>
    <v-btn
      v-if="ownProfile"
      :color="editing ? '#1DE9B6' : '#26C6DA'"
      dark
      fixed
      bottom
      right
      fab
      v-on:click="editing ? onSaveData() : editing = true"
    >
      <v-icon>{{editing ? "check" : "edit" }}</v-icon>
    </v-btn>
    <v-btn
      v-if="ownProfile && editing"
      color="red"
      dark
      fixed
      bottom
      left
      fab
      v-on:click="onCancelEdit()"
    >
      <v-icon>cancel</v-icon>
    </v-btn>
    <div class="px-4" style="width:100%">
      <v-btn
        v-if="!ownProfile"
        style="width:90%"
        class="px-6"
        fixed
        bottom
        v-on:click="onFollowButton"
        color="primary"
      >{{isFollowing() ? "Dejar de seguir" : "Seguir"}}</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProfileForm extends Vue {
  @Prop() private ownProfile!: Boolean;
  @Prop() private user!: any;
  @Prop() private userFollowing!: Array<number>;
  private editing = false;
  private defaultPic =
    "https://i7.pngguru.com/preview/1/964/992/user-profile-computer-icons-login-clip-art-profile-picture-icon.jpg";

  isFollowing() {
    if (!this.ownProfile && this.userFollowing) {
        const exist = this.userFollowing.indexOf(this.user.userUID);
        return exist !== -1
    }
  }

  onSaveData() {
    //emit
    this.editing = false;
    this.$emit("onSaveData");
    //this.saveUserData(this.user);
  }
  onCancelEdit() {
    //emit
    this.editing = false;
    this.$emit("onCancelEdit");
    //this.resetUserData();
  }

  onFollowButton() {
    if (this.isFollowing())
        this.unFollow();
    else
        this.follow();
  }

  follow() {
    this.$emit("onFollow");
  }

  unFollow() {
      this.$emit("onUnFollow");
  }
}
</script>