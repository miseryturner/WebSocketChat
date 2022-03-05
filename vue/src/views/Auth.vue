<template>
  <div class="auth">
    <div class="form">
      <h1>Вход в аккаунт</h1>
      <input type="text" ref="field" placeholder="Номер телефона">
      <input type="password" placeholder="Пароль">
      <div class="form-group">
        <router-link to="/register" class="form-recovery" href="#">Регистрация</router-link>
      </div>
      <button>Войти</button>
    </div>
  </div>
</template>

<script>
import inputmask from 'inputmask';

export default {
  data() {
    return {

    }
  },
  mounted () {
    // ... используем
    var im = new inputmask("+7 (999) 999-99-99");
    im.mask(this.$refs.field);
  }
}
</script>
