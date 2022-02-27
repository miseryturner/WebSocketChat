<template>
    <div id="nav" class="app">
      <Header @setting="settingView"/>
      <button class="test" @click="sendMessage('hello, it`s test message', 12, 2)">test</button>
      <router-view :settings-view="settingsView"/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      settingsView: false,
      ws: ''
    }
  },
  async mounted() {
    this.ws = new WebSocket('ws://localhost:3000');
    console.log(this.ws);
    this.ws.onopen = () => {
      console.log('hello')
    }
    this.ws.onmessage = (event) => {
      // JSON.parse(event.data).test.text().then(text => {
      //   console.log(text)
      // });

      console.log(JSON.parse(event.data).message)
      console.log(JSON.parse(event.data).id_user);
      console.log(JSON.parse(event.data).id_chat);
    }
  },
  methods: {
    settingView(data) {
      this.settingsView = data.settingView;
    },
    sendMessage: async function(message, id_user, id_chat) {

      this.ws.send(JSON.stringify({
        message: message,
        id_user: id_user,
        id_chat: id_chat
      }))
    }
  }
}
</script>

<style>
@import url(./assets/styles/main.css);
</style>
