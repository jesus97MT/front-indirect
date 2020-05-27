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
        <v-icon large left>mdi-twitter</v-icon>
        <span class="title font-weight-light">{{date}}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">{{text}}</v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" :src="userImg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Evan You</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" color="#26c6da" dark tile v-else>
      <v-card-title>
        <v-icon large left>mdi-twitter</v-icon>
        <span class="title font-weight-light">{{date}}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <v-textarea v-model="textNewIndirect" name="input-7-4" label="Create a new Indirect!!"></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content v-if="typeNewIndirect" style="flex-grow:4">
            <v-list-item-title >Public Indirect</v-list-item-title>
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
                      <v-img :src="data.item.avatar"></v-img>
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
  @Prop() private text!: string;
  @Prop() private date!: string;
  @Prop() private userImg!: string;
  @Prop() private type!: boolean;
  @Prop() private mutualList!: object;


  private textNewIndirect: string = "";
  private typeNewIndirect: boolean = true; //true -> public || false -> private
  private indirectTo: Array<number> = [];

  sendIndirect() {
    if (this.verifyIndirect()) {
      const indirect = {
        text: this.textNewIndirect,
        public: this.typeNewIndirect,
        uids: this.indirectTo && this.indirectTo.length ? this.indirectTo : null
      };
      this.$emit("onSendIndirect", indirect);
    } else {
      console.log("invalid indirect")
    }
  }

  verifyIndirect() {
    if (this.textNewIndirect) {
      if (!this.typeNewIndirect) {
        if (this.indirectTo && this.indirectTo.length)
          return true;
      } else
        return true;
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
