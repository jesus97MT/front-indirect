<template>
  <div align="center">
    <v-alert dense text type="info" color="primary" class="my-6 mx-6">
      Usuario no encontrado
    </v-alert>
    <v-img width="250px" src="https://pngimage.net/wp-content/uploads/2018/06/sad-face-png-1.png"></v-img>
    <div class="my-2">
      <v-btn text x-large @click="$router.go(-2)" color="primary">VOLVER</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ProfileNotFound extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
