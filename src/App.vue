<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import GameCreationForm from "@/components/GameCreationForm.vue";

export default {
  name: "app",
  components: {
    GameCreationForm
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
