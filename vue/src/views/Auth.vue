<template>
  <div class="auth">
    <div class="form">
      <h1>Вход в аккаунт</h1>
      <input type="text" ref="field" :class="{ dontTrue: dontTrue }" v-model="authData.phone" placeholder="Номер телефона">
      <input type="password" :class="{ dontTrue: dontTrue }" v-model="authData.password" placeholder="Пароль">
      <div class="form-group">
        <router-link to="/register" class="form-recovery" href="#">Регистрация</router-link>
      </div>
      <button @click="auth">Войти</button>
    </div>
  </div>
</template>

<script>
import inputmask from 'inputmask';

export default {
  data() {
    return {
      authData: {
        password: '',
        phone: ''
      },
      dontTrue: false
    }
  },
  mounted () {
    // ... используем
    var im = new inputmask("+7 (999) 999-99-99");
    im.mask(this.$refs.field);
  },
  methods: {
    auth() {
      var formdata = new FormData();
      formdata.append("password", this.authData.password);
      formdata.append("phone",  this.authData.phone);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:5000/api/login", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            if(!isNaN(Number(result))) {
              localStorage.setItem('id', result)
              location.href = '/'
            } else {
              this.dontTrue = true
            }
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>
