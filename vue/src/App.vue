<template>
    <div id="nav" class="app">
      <Header @setting="settingView"/>
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
      settingsView: false
    }
  },
  methods: {
    settingView(data) {
      this.settingsView = data.settingView;
    }
  }
}
</script>

<style>
@import url(./assets/styles/main.css);
</style>
