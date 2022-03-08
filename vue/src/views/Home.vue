<template>
  <div class="wrapper">
    <div class="conversation-area">
      <div @click="openChat(item.id)" v-for="item in chatList" :key="item.id" class="msg active">
        <img class="msg-profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg" alt="" />
        <div class="msg-detail">
          <div class="msg-username">{{ item.anyName }}</div>
          <div class="msg-content">
            <span class="msg-message">Привет</span>
            <span class="msg-date">20м</span>
          </div>
        </div>
      </div>
      <router-link to="/search" class="add"></router-link>
      <div class="overlay"></div>
    </div>
    <div class="chat-area">
        <div class="chat-area-header">
          <div class="chat-area-title">Иван Иванов</div>
          <div class="chat-area-group">
            <img class="chat-area-profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg" alt="" />
          </div>
        </div>
        <div class="chat-area-main">
          <div v-for="item in chatMessage" :key="item.id">
            <div v-if="item.from_user_id != user_id" class="chat-msg">
              <div class="chat-msg-content">
                <div class="chat-msg-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
            <div v-else class="chat-msg owner">
              <div class="chat-msg-content">
                <div class="chat-msg-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
          <div v-for="item in websocketMessage" :key="item.id">
            <div v-if="item.id_chat === chat">
              <div v-if="item.id_user !== user_id" class="chat-msg">
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    {{ item.message }}
                  </div>
                </div>
              </div>
              <div v-if="item.id_user === user_id" class="chat-msg owner">
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    {{ item.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-area-footer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
          <input v-model="message" type="text" placeholder="Сообщение..." />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
          <svg @click="sendNewMessage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
        </div>
      </div>
      <div v-if="settingsView" class="detail-area">
        <img class="profile_image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
        <h2>{{ userData.name }}</h2>
        <hr>
        <h5>{{ userData.phone }}</h5>
        <button class="logout" @click="logout">Выйти</button>
      </div>
    </div>
</template>

<script>
    export default {
      props: [ 'settingsView', 'userData', 'chatList', 'websocketMessage' ],
      data() {
        return {
          lastChat: {},
          user_id: localStorage.getItem('id'),
          chatMessage: {

          },
          chat: '',
          message: ''
        }
      },
      mounted() {
        if(localStorage.getItem('chat_id'))
          this.chat = localStorage.getItem('chat_id')
        let requestOptions = {
          method: 'GET'
        };

        fetch(`http://localhost:5000/api/messages?id=${localStorage.getItem('chat_id')}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              this.chatMessage = result
            })
            .catch(error => console.log('error', error));
      },
      methods: {
        logout() {
          localStorage.removeItem('id');
          localStorage.removeItem('chat_id');
          location.reload();
        },
        sendNewMessage() {
          console.log(localStorage.getItem('chat_id'), ' -- ', this.message, ' -- ', localStorage.getItem('id'));
          this.$emit('send_new_message', {
            message: this.message,
            id_user: localStorage.getItem('id'),
            id_chat: localStorage.getItem('chat_id')
          })
          this.message = ''
        },
        openChat(id) {
          this.message = '';
          this.chat = id;
          localStorage.setItem('chat_id', this.chat);

          location.reload();

          // let requestOptions = {
          //   method: 'GET'
          // };
          //
          // fetch(`http://localhost:5000/api/messages?id=${id}`, requestOptions)
          //     .then(response => response.json())
          //     .then(result => {
          //       console.log(result)
          //       this.chatMessage = result
          //     })
          //     .catch(error => console.log('error', error));
        }
      }
    }
</script>
