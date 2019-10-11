<template>
  <p>feedbackly storybook!</p>
</template>
<script lang="ts">
interface Idata {
  hello: string;
}
export default {
  data: () =>
    ({ hello: "people" } as Idata),
};
</script>

<style lang="scss" scoped>
p {
  color: #008080;
}
</style>
