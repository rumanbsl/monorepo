<template>
  <div id="app">
    We start
  </div>
</template>

<script lang="ts">
import Vue from "vue";

/** */
const a = async () => 5;
export default Vue.extend({
  mounted() {
    this.callAwait();
  },
  methods: {
    async callAwait() {
      console.log(await a());
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
