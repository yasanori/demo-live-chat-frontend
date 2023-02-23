<template>
  <div>I'm TestComponent.</div>
  <p>{{ message }}</p>
  <button @click="onClick">親メソッドを実行するボタン</button>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    onClick() {
      this.$emit("toggle");
    },
  },
};
</script>

<style></style>
