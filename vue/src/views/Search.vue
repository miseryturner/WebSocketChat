<template>
  <div>
    <div class="search-bar">
      <input @input="search" v-model="value" type="text" placeholder="Поиск..." />
    </div>

    <div class="users">
      <div class="user_item" v-for="item in users" :key="item.id">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
        <div class="right">
          <h1 class="title">
            {{ item.login }}
          </h1>
          <h3>{{ item.phone }}</h3>
        </div>
        <button @click="createChat(item.id)">Создать чат</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        users: [],
        chats: []
      }
    },
    beforeCreate() {
      var requestOptions2 = {
        method: 'GET'
      };

      fetch(`http://localhost:5000/api/chats?id=${localStorage.getItem('id')}`, requestOptions2)
          .then(response => response.json())
          .then(result => {
            this.chats = result
          })
          .catch(error => console.log('error', error));
    },
    methods: {
      search() {
        this.users = [];
        var formdata = new FormData();
        formdata.append("login", this.value);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://localhost:5000/api/users", requestOptions)
            .then(response => response.json())
            .then(result => {
              if(result != 'Error') {
                let testId = [];
                testId.push(Number(localStorage.getItem('id')))
                for (let j = 0; j < this.chats.length; j++) {
                  if(this.chats[j].first_id == localStorage.getItem('id')) {
                    testId.push(this.chats[j].second_id);
                  } else {
                    testId.push(this.chats[j].first_id);
                  }
                }
                console.log(testId)

                for (let i = 0; i < result.length; i++) {
                  if(testId.indexOf(Number(result[i].id)) == -1) {
                    this.users.push(result[i])
                  }
                }
              }
              else {
                this.users = []
              }
            })
            .catch(error => console.log('error', error));
      },
      createChat(id) {
        let formdata = new FormData();
        formdata.append("first_id", localStorage.getItem('id'));
        formdata.append("second_id", id);

        let requestOptions = {
          method: 'POST',
          body: formdata
        };

        fetch("http://localhost:5000/api/create-chat", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            localStorage.setItem('chat_id', result)
            location.href = '/';
          })
          .catch(error => console.log('error', error));
      }
    }
  }
</script>