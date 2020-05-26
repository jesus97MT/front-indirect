<template>
<div>
<v-card
    class="mx-auto"
    color="#26c6da"
    dark
    tile
    v-if="type"
      :style="`border-bottom:1px solid ${this.$vuetify.theme.themes.light.separator}!important`"
    
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="title font-weight-light">{{date}}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{text}}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="userImg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-share-variant</v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    tile
    v-else
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="title font-weight-light">{{date}}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <v-textarea
          name="input-7-4"
          label="Create a new Indirect!!"
        ></v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="userImg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Public</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-switch v-model="showMessages" label="Public indirect"></v-switch>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-btn class=" mt-6 mb-4" block color="secondary" @click="test">Send</v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</div>
   

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Indirect extends Vue {
  @Prop() private text!: string;
  @Prop() private date!: string;
  @Prop() private userImg!: string;
  @Prop() private type!: boolean;
  @Prop() private mutualList!: object;

  test() {
    console.log(this.mutualList)
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  display: flex;
  border: 1px solid black;
  padding: 1rem;
  .user-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
