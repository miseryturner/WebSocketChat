<template>
    <div id="nav" class="app">
      <Header @setting="settingView"/>
      <router-view @send_new_message="sendMessage" :settings-view="settingsView" :user-data="userData" :chat-list="chatList" :websocket-message="webSocketMessages"/>
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
      ws: '',
      user_id: true,
      webSocketMessages: [],
      userData: {},
      chatList: []
    }
  },
  beforeCreate() {
    if(!localStorage.getItem('id') && location.pathname != '/register') {
      this.$router.push({ path: '/auth' });
    }

    //Запорос на данные о пользователе
    let formdata = new FormData();
    formdata.append("id", localStorage.getItem('id'));

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/user", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          this.userData = result
        })
        .catch(error => console.log('error', error));


    //запрос на список чатов пользователя

    fetch(`http://localhost:5000/api/chats?id=${localStorage.getItem('id')}`, {method: 'GET'})
        .then(response => response.json())
        .then(result => {
          for (let i = 0; i < result.length; i++) {
            let anyUser = result[i].first_id;
            if(result[i].first_id == localStorage.getItem('id')) {
              anyUser = result[i].second_id
            }
            let formdata2 = new FormData();
            formdata2.append("id", anyUser);

            let requestOptions2 = {
              method: 'POST',
              body: formdata2,
              redirect: 'follow'
            };

            fetch("http://localhost:5000/api/user", requestOptions2)
                .then(response => response.json())
                .then(resultAny => {
                  console.log(resultAny)
                  this.chatList[i] = {
                    id: result[i].id,
                    anyName: resultAny.name
                  };
                })
                .catch(error => console.log('error', error));
          }
          console.log(this.chatList)
        })
        .catch(error => console.log('error', error));
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
      this.webSocketMessages.push({
        message: JSON.parse(event.data).message,
        id_user: JSON.parse(event.data).id_user,
        id_chat: JSON.parse(event.data).id_chat
      })
      console.log(JSON.parse(event.data).message)
      console.log(JSON.parse(event.data).id_user);
      console.log(JSON.parse(event.data).id_chat);
    }
  },
  methods: {
    settingView(data) {
      this.settingsView = data.settingView;
    },
    sendMessage: async function(data) {
      this.ws.send(JSON.stringify({
        message: data.message,
        id_user: data.id_user,
        id_chat: data.id_chat
      }))
    }
  }
}
</script>

<style>
@import url(./assets/styles/main.css);
</style>
