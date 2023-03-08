<template>
  <div class="chat-window">{{ messages }}</div>
</template>

<script>
export default {
  props: ["messages"],
};
</script>

<style scoped>
.chat-window {
  background: white;
  padding: 30px 20px;
  border-bottom: 1px solid #eee;
}
</style>
