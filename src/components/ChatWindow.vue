<template>
  <div class="chat-window">
    <div v-if="messages" class="messages">
      <ul v-for="message in messages" :key="message.id">
        <li>
          <span class="name">{{ message.name }}</span>
          <span class="message">{{ message.content }}</span>
          <span class="created-at">{{ message.created_at }}</span>
        </li>
      </ul>
    </div>
  </div>
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
