<template>
  <div class="main">
    {{text}}
    {{date}}
    {{user}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Indirect extends Vue {
 @Prop() private text!: string;
 @Prop() private date!: string;
 @Prop() private user!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
