<template>
  <div class="container">
    <Navbar />
    <ChatWindow :messages="messages" />
    <NewChatForm />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import ChatWindow from "../components/ChatWindow.vue";
import NewChatForm from "../components/NewChatForm.vue";
import ActionCable from "actioncable";

export default {
  components: { Navbar, ChatWindow, NewChatForm },
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
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    this.messageChannel = cable.subscriptions.create("RoomChannel", {
      connected: () => {
        this.getMessages();
      },
      received: () => this.getMessages(),
    });
    this.getMessage();
  },
  beforeUnmount() {
    this.messageChannel.unsubscribe();
  },
};
</script>

<style scoped></style>
