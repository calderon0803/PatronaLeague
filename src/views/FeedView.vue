<script setup>
import MatchCard from "../components/MatchCard.vue";
import { usechallengesStore } from "../store/challengesStore.js";

const challengesStore = usechallengesStore();
</script>
<template>
  <div v-if="challengesStore.challenges.length > 0" class="game">
    <MatchCard />
    <button class="filters"><span class="mdi mdi-filter"></span></button>
    <button class="new-challenge"><span class="mdi mdi-plus"></span></button>
  </div>
  <div v-else class="game">
    <p>No users found</p>
  </div>
</template>
<style scoped lang="scss">
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(to right, #f6d365, #fda085);
}

.filters {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  font-size: 45px;
  color: white;
  background-color: #000;
  border: 2px solid #000;
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.new-challenge {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  font-size: 45px;
  color: white;
  background-color: #000;
  border: 2px solid #000;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
