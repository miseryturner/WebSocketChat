<template>
  <div class="auth">
    <div class="form">
      <h1>Регистрация</h1>
      <input type="text" v-model="userData.login" placeholder="Логин">
      <input type="text" v-model="userData.phone" ref="field" placeholder="Номер телефона">
      <input type="password" v-model="userData.password" placeholder="Пароль">
      <div class="form-group">
        <router-link to="/auth" class="form-recovery" href="#">Авторизация</router-link>
      </div>
      <button @click="register">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script>

import inputmask from "inputmask";

export default {
  data() {
    return {
      userData: {
        login: '',
        phone: '',
        password: ''
      }
    }
  },
  mounted () {
    // ... используем
    var im = new inputmask("+7 (999) 999-99-99");
    im.mask(this.$refs.field);
  },
  methods: {
    register() {
      let formdata = new FormData();
      formdata.append("login", this.userData.login);
      formdata.append("phone", this.userData.phone);
      formdata.append("password", this.userData.password);

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:5000/api/registration", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            localStorage.setItem('id', result)
            location.href = '/'
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>
