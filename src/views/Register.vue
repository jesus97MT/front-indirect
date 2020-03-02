<template>
    <div class="main mx-5 mt-5">
      <v-img src="../../public/logo/logo.png" aspect-ratio="1.5"></v-img>
      <v-form class="mt-4">
        <v-text-field
          label="Introduce un nombre de usuario único"
          name="userId"
          prepend-icon="person"
          type="text"
          required
          v-model="registerData.userId"
        />
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
        password: "",
        userId:""
      }
    };
  },
  store,
  methods: {
    ...mapActions("account", ["register"]),
    onRegister() {
      //maps action??
      const email = this.registerData.email;
      const password = this.registerData.password;
      const userId = this.registerData.userId;
      this.register({ email, password, userId });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>