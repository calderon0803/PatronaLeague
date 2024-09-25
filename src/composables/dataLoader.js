import { usechallengesStore } from "@/store/challengesStore.js";
import { showToast } from "@/utils/showToast.js";

export async function useDataLoader() {
  await loadData();
}

function loadData() {
  const challengesStore = usechallengesStore();
  fetch("/data/users-list.json")
    .then(function (res) {
      return res.json();
    })
    .then(async function (data) {
      //Save users in store
      challengesStore.users = data;

      return data;
    })
    .catch(function () {
      showError();
    });
  const showError = () => {
    showToast("Error al cargar.", "error");
  };
}
