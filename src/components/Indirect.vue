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
        <span class="title font-weight-black">@{{indirect.userData.userId}}</span>
        <img src="../../public/logo/logo.png" class="ml-auto" style="width:48px" />

      </v-card-title>

      <v-card-text class="headline font-weight-bold">{{indirect.text}}</v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              :src="avatars && indirect.userData.userUID && avatars[indirect.userData.userUID] || defaultPic"
              class="elevation-6"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{indirect.userData.name + " " + indirect.userData.surname}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <span
              class="font-italic caption font-weight-light"
            >{{new Date(indirect.dateCreation).toLocaleString()}}</span>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">0</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" color="#26c6da" dark tile v-else>
      <v-card-title>
        <v-icon large left>mdi-twitter</v-icon>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <v-textarea v-model="textNewIndirect" name="input-7-4" label="Create a new Indirect!!"></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content v-if="typeNewIndirect" style="flex-grow:4">
            <v-list-item-title>Public Indirect</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-else style="flex-grow:4">
            <v-autocomplete
              v-model="indirectTo"
              :items="mutualList"
              label="Private Indirect"
              multiple
              chips
              hint="Select mutuals"
              persistent-hint
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img></v-img>
                  </v-avatar>
                  {{ data.item.text }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.text"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-list-item-content>
          <v-list-item-content class="flex-grow-1 flex-shrink-0">
            <div>
              <v-checkbox class="float-right" v-model="typeNewIndirect"></v-checkbox>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
      <v-list-item-content class="mx-4 my-2">
        <v-btn small block color="secondary" @click="sendIndirect">Send</v-btn>
      </v-list-item-content>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Indirect extends Vue {
  @Prop() private indirect!: object;
  @Prop() private type!: boolean;
  @Prop() private mutualList!: object;
  @Prop() private avatars!: object;

  private textNewIndirect: string = "";
  private typeNewIndirect: boolean = true; //true -> public || false -> private
  private indirectTo: Array<number> = [];

  private defaultPic =
    "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";

  sendIndirect() {
    if (this.verifyIndirect()) {
      const indirect = {
        text: this.textNewIndirect,
        public: this.typeNewIndirect,
        uids: this.indirectTo && this.indirectTo.length ? this.indirectTo : null
      };
      this.$emit("onSendIndirect", indirect);
    } else {
      console.log("invalid indirect");
    }
  }

  verifyIndirect() {
    if (this.textNewIndirect) {
      if (!this.typeNewIndirect) {
        if (this.indirectTo && this.indirectTo.length) return true;
      } else return true;
    }
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
