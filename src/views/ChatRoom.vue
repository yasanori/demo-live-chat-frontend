<template>
  <div class="container">
    <Navbar />
    <ChatWindow
      @connectCable="connectCable"
      :messages="formattedMessages"
      ref="chatWindow"
    />
    <NewChatForm @connectCable="connectCable" />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import ChatWindow from "../components/ChatWindow.vue";
import NewChatForm from "../components/NewChatForm.vue";
import ActionCable from "actioncable";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export default {
  components: { Navbar, ChatWindow, NewChatForm },
  data() {
    return { messages: [] };
  },
  computed: {
    formattedMessages() {
      return this.messages.map((message) => {
        const time = formatDistanceToNow(new Date(message.created_at), {
          locale: ja,
        });
        return { ...message, created_at: time };
      });
    },
  },
  methods: {
    async getMessage() {
      try {
        const res = await axios.get("http://localhost:3000/messages", {
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
    connectCable(message) {
      this.messageChannel.perform("receive", {
        message: message,
        email: window.localStorage.getItem("uid"),
      });
    },
  },
  mounted() {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    this.messageChannel = cable.subscriptions.create("RoomChannel", {
      connected: () => {
        this.getMessage().then(() => {
          this.$refs.chatWindow.scrollToBottom();
        });
      },
      received: () =>
        this.getMessage().then(() => {
          this.$refs.chatWindow.scrollToBottom();
        }),
    });
    this.getMessage().then(() => {
      this.$refs.chatWindow.scrollToBottom();
    });
  },
  beforeUnmount() {
    this.messageChannel.unsubscribe();
  },
};
</script>

<style scoped></style>
