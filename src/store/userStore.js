import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      users: [],
      isLogged: false,
    };
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isLogged;
    },
  },
  actions: {
    saveLoginData(userData) {
      this.setUser(userData);
    },
    setUser(user) {
      this.user = user;
      this.isLogged = true;
    },
    logout() {
      this.user = null;
      this.isLogged = false;
    },
  },
});
