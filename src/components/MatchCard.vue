<script setup>
import { onMounted, ref } from "vue";
import { usechallengesStore } from "../store/challengesStore";

const challengesStore = usechallengesStore();

const handleClick = (challenge) => {
  console.log(challenge);
};
</script>
<template>
  <div class="container">
    <div
      v-for="challenge in challengesStore.challenges"
      :key="challenge.id"
      class="card"
      @click="handleClick(challenge)"
    >
      <p class="challenge-title">
        {{ challenge.challenge.title }}
      </p>
      <p class="challenge-type">{{ challenge.challenge.type_name }}</p>
      <p class="challenger">{{ challenge.challenger.name }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  background-color: transparent;
  height: 100vh;
  width: 100vw;
}

.card {
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 20px rgb(0 0 0 / 30%);
  border: 3px solid;
  border-color: rgb(255 0 0);
  background-color: rgb(255 0 0 / 30%);
}

.challenge-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.challenger {
  font-size: 1rem;
  color: grey;
  display: block;
  float: right;
}
</style>
