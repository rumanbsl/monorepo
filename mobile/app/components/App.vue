<template>
  <Page>
    <ActionBar title="Bitches" />
    <GridLayout columns="*" rows="*">
      <Label :text="msg" class="message" col="0" row="0" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
export default {
  data() {
    return { msg: "Hello Ruman!" };
  },
};
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
