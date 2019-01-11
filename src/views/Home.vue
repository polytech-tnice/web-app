<template>
  <div class="home">
    <h1>T-Nice</h1>
    <game-creation-form/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameCreationForm from '@/components/GameCreationForm.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    GameCreationForm,
  },
});
</script>
