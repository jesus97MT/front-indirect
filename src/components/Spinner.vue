<template>
  <v-app>
    <v-container fluid fill-height :style="`background-color:${this.$vuetify.theme.themes.light.base}`">
      <v-layout justify-center align-center>
        <div>
          <v-img src="../../public/logo/logo.png" width="250px" height="250px"></v-img>
          <div class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Spinner extends Vue {
  @Prop() private isLoading!: boolean;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
