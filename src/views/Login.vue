<template>
  <div class="main mx-5 mt-5">
    <v-img src="../../public/logo/logo.png" aspect-ratio="1.5"></v-img>
    <v-form class="mt-4">
      <v-text-field
        label="Login"
        name="login"
        prepend-icon="person"
        type="text"
        required
        v-model="loginData.email"
      />

      <v-text-field
        id="password"
        label="Password"
        name="password"
        prepend-icon="lock"
        type="password"
        required
        v-model="loginData.password"
      />
    </v-form>
    <v-btn class="main mt-6 mb-4" block v-on:click="onLogin" color="primary">Login</v-btn>
    <v-btn block to="/register">¿No tiene cuenta?</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import store from "../store";

// @ is an alias to /src

export default {
  data() {
    return {
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  store,
  methods: {
    ...mapActions("account", ["login"]),
    onLogin() {
      const email = this.loginData.email;
      const password = this.loginData.password;
      this.login({ email, password });
      //maps action??
    }
  }
};
</script>

<style lang="scss" scoped>
</style>