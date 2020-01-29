<template>
  <div class="main">
      <div v-if="isLogin" class="container">
        <div>
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required v-model="loginData.email">
        </div>
        <div>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required v-model="loginData.password">
        </div>
        <div>
        <button v-on:click="onLogin">Login</button>
        </div>
        <div>
        <button v-on:click="isLogin = false">¿No tiene cuenta?</button>
        </div>

        <router-link to="/">Go to index</router-link>
        <!-- <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label> -->
      </div>
      <div v-else class="container">
        <div>
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required v-model="registerData.email">
        </div>
        <div>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required v-model="registerData.password">
        </div>
        <div>
        <button v-on:click="onRegister">Register</button>
        </div>
        <div>
        <button v-on:click="isLogin = true">¿Tienes cuenta?</button>
        </div>
        <!-- <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label> -->
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from '../store'

// @ is an alias to /src

export default {
    data() {
        return {
            localCount: 4,
            isLogin: true,
            loginData: {
              email: "",
              password: ""
            },
            registerData: {
              email: "",
              password: ""
            }
        }
    },
    store,
    computed: mapState({
        count: state => state.count,
        countAlias: 'count',

    }),
    methods: {

      ...mapActions('login', ['login', 'register']),
      onLogin() {
        const email = this.loginData.email;
        const password = this.loginData.password;
        this.login({email, password});
        //maps action??
      },
      onRegister() {
        //maps action??
        const email = this.registerData.email;
        const password = this.registerData.password;
        this.register({email, password});

      }
    }
}
    
</script>

<style lang="scss" scoped>

.main {
}
.container > div {
  margin: 1em 2em;
  input {
    width: 100%;
    padding: 12px 5px;
  }
  
}
</style>