import { writable } from "svelte/store";

function saveToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getFromLocalStorage() {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

export const userStore = writable(getFromLocalStorage());

userStore.subscribe((user) => {
  if (user) {
    saveToLocalStorage(user);
  } else {
    localStorage.removeItem("user");
  }
});
