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
          v-model="registerData.email"
        />

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
          required
          v-model="registerData.password"
        />
      </v-form>
      <v-btn class="main mt-6 mb-4" block v-on:click="onRegister" color="primary">Registrar</v-btn>
      <v-btn block to="/login">¿Tiene cuenta?</v-btn>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import store from "../store";

// @ is an alias to /src

export default {
  data() {
    return {
      registerData: {
        email: "",
        password: ""
      }
    };
  },
  store,
  methods: {
    ...mapActions("login", ["register"]),
    onRegister() {
      //maps action??
      const email = this.registerData.email;
      const password = this.registerData.password;
      this.register({ email, password });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>