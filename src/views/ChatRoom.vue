<template>
  <div class="container">
    <Navbar />
    <ChatWindow :messages="messages" />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import ChatWindow from "../components/ChatWindow.vue";

export default {
  components: { Navbar, ChatWindow },
  data() {
    return { messages: [] };
  },
  methods: {
    async getMessage() {
      try {
        const res = axios.get("http://localhost:3000/messages", {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        if (!res) {
          new Error("メッセージ一覧を取得できませんでした");
        }
        this.messages = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getMessage();
  },
};
</script>

<style scoped></style>
