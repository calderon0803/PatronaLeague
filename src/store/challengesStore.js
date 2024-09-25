import { defineStore } from "pinia";

export const usechallengesStore = defineStore("challengesStore", {
  state: () => {
    return {
      challenges: [
        {
          id: 1,
          challenge: {
            id: 20,
            type_id: 5,
            type_name: "Trivia",
            title: "Deportes y pasatiempos",
            description:
              "Cada peña designa un miembro para que se enfrente en un duelo de cultura general. Los participantes responderán preguntas sobre el tema seleccionado. El que más aciertos tenga, se llevará el reto.",
          },
          points: 10,
          challenger: {
            name: "Dobra Kai",
            members: 15,
            login_user: "dobrakai",
            login_password: "carlos",
          },
          accepted_by: null,
          creator_confirmation: false,
          acceptor_confirmation: false,
          status: "waiting",
        },
      ],
    };
  },
  getters: {},
  actions: {},
});
