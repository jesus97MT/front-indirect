<template>
  <div height="100%">
    <div
      class="mx-auto"
      max-width="434"
      height="45%"
      style="background: linear-gradient(to right, #26C6DA 30%, #1DE9B6 70%);"
      align="center"
    >
      <v-row align="end" class="fill-height mx-0">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-sheet elevation="20" class="mx-auto" height="164" width="164" light>
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img :src="user.profilePicUrl"></v-img>
            </v-avatar>
          </v-sheet>
        </v-col>
        <v-col class>
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title" v-if="!editing">{{ user.name }}</v-list-item-title>
              <v-list-item-title class="title" v-else>
                <v-text-field
                  v-model="user.name"
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
        style="background: linear-gradient(to right, #1DE9B6 50%, #26C6DA 50%);"
        align="center"
      >
        <v-row align="end" class="fill-height mx-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark class="pa-0">
            <v-col class="pa-0">
              <v-list-item class="pa-0" color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ user.followers }}</v-list-item-title>
                  <v-list-item-subtitle>Followers</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ user.following }}</v-list-item-title>
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
        v-model="user.email"
        label="E-mail"
        required
        :readonly="!editing"
        :disabled="true"
      ></v-text-field>

      <v-text-field
        v-model="user.date"
        label="Date"
        :readonly="!editing"
        :disabled="!editing"
        required
      ></v-text-field>
    </div>
    <v-btn
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
    <v-btn v-if="editing" color="red" dark fixed bottom left fab v-on:click="onCancelEdit()">
      <v-icon>cancel</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("user", {
        user: "getUserData"
    })
  },
  methods: {
    ...mapActions("user", ["saveUserData", "resetUserData"]),
    onSaveData() {
      this.editing = false;
      this.saveUserData(this.user);
    },
    onCancelEdit() {
      this.resetUserData();
      this.editing = false;
    }
  },
  data() {
    return {
      editing: false,
    };
  }
};
</script>