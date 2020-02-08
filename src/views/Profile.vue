<template>
  <v-card
    class="mx-auto"
    max-width="434"
    tile
  >
    <v-img
      height="100%"
      align="center"
      src="../../public/media/profile-background.png"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
        <v-sheet
            elevation="20"
            class="mx-auto"
            height="164"
            width="164"
            light
          >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
          
          
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            
          </v-avatar>
          </v-sheet>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
              <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
     
    }
  }
};
</script>