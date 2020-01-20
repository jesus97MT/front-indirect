<template>
  <div class="main">
    <img :src="userImg" class="user-icon">
    {{text}}
    <span>{{date}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Indirect extends Vue {
 @Prop() private text!: string;
 @Prop() private date!: string;
 @Prop() private userImg!: string;
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
