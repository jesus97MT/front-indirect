<template>
  <div class="main mx-5 my-5">
    <div style="display:flex">
      <div style="width:500px">
        <v-img src="../../public/logo/logo.png" aspect-ratio="1.5"></v-img>
        <div class="mx-4">
          <v-form class="mt-4">
            <v-text-field
              :rules="[() => !!registerData.userId || 'This field is required']"
              label="Enter a unique username"
              name="userId"
              prepend-icon="person"
              type="text"
              required
              v-model="registerData.userId"
            />
            <v-text-field
              :rules="[() => !!registerData.email || 'This field is required']"
              label="Email"
              name="email"
              prepend-icon="person"
              type="text"
              required
              v-model="registerData.email"
              @keyup.enter="onLogin"
            />

            <v-text-field
              :rules="[() => !!registerData.password || 'This field is required']"
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
              required
              v-model="registerData.password"
              @keyup.enter="onLogin"
            />
          </v-form>
          <v-btn
            class="main mt-6 mb-4"
            :disabled="!(registerData.email && registerData.password && registerData.userId)"
            block
            v-on:click="onRegister"
            color="primary"
          >Register</v-btn>
          <v-btn block to="/login">Have an account?</v-btn>
        </div>
      </div>
      <v-list class="d-none d-sm-block my-5 ml-5" style="max-width:300px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>App created by</v-list-item-title>
            <v-list-item-subtitle>Jesús Martínez Torrecilla</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Version App</v-list-item-title>
            <v-list-item-subtitle>1.0.0</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
            <v-list-item-subtitle>jesusmartorrecilla@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Github</v-list-item-title>
            <v-list-item-subtitle>https://github.com/jesus97MT</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>About the App</v-list-item-title>
            <v-list-item-subtitle
              style="white-space:initial!important"
            >Indirect is an application to talk with friends and send indirects messages that the receipt doesnt know that your indirect is for him/her.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

// @ is an alias to /src

export default {
  data() {
    return {
      registerData: {
        userId:"",
        email: "",
        password: ""
      }
    };
  },
  methods: {
        ...mapActions("account", ["register"]),
    onRegister() {
      const userId = this.registerData.userId;
      const email = this.registerData.email;
      const password = this.registerData.password;
      if (email && password && userId) this.register({ email, password, userId });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>