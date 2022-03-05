<template>
  <div class="auth">
    <div class="form">
      <h1>Регистрация</h1>
      <input type="text" placeholder="Логин">
      <input type="text" ref="field" placeholder="Номер телефона">
      <input type="password" placeholder="Пароль">
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

    }
  },
  mounted () {
    // ... используем
    var im = new inputmask("+7 (999) 999-99-99");
    im.mask(this.$refs.field);
  },
  methods: {
    register() {
      localStorage.setItem('id', 1);
      this.$router.push({ path: '/' });
    }
  }
}
</script>
