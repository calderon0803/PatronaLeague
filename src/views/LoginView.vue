<script setup>
import { onMounted, ref } from "vue";
import BaseInput from "@/components/base/ui/BaseInput.vue";
import BaseLoadingButton from "@/components/base/ui/BaseLoadingButton.vue";
import { useDataLoader } from "../composables/dataLoader";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const loginUser = ref(null);
const password = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  await init();
});

const init = async () => {
  if (isMobile()) {
    await useDataLoader();
  }
};

const launchLogin = async () => {
  try {
    isLoading.value = true;
    const user = userStore.users.find(
      (u) =>
        u.login_user === loginUser.value && u.login_password === password.value
    );

    userStore.saveLoginData(user);
    router.push({ name: "Feed" });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const isMobile = () => {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  );
};
</script>

<template>
  <div class="home">
    <div class="welcome">
      <img src="/favicon.webp" />
      <p v-if="isMobile">Bienvenid@ Peñista</p>
      <p v-else>Para poder acceder, entra desde un dispositivo móvil.</p>
      <BaseInput
        v-model="dni"
        :type="'text'"
        :name="'DNI'"
        :placeholder="'Introduzca su dni...'"
      />
      <BaseInput
        v-model="password"
        :type="'password'"
        :name="'Contraseña'"
        :placeholder="'Introduzca su contraseña...'"
      />
      <BaseLoadingButton
        :is-loading="isLoading"
        :is-shrinkable="false"
        class="button__secondary login-button"
        button-text="Iniciar sesión"
        @click="launchLogin"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome {
  width: fit-content;
  height: fit-content;
  background-color: white;
  padding: 1rem;
  border-radius: 5%;

  p {
    font-size: 2rem;
    text-align: center;
  }

  span {
    color: red;
    font-size: 5rem;
    display: block;
    text-align: center;
  }

  img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
}

.login-button {
  display: block;
  margin: 0 auto;
}
</style>
