// src/stores/content.js
import { writable } from "svelte/store";

const stored = localStorage.getItem("content");

export const store = writable(stored || null);

store.subscribe((value) => {
  if (value !== null) {
    localStorage.setItem("content", value);
  } else {
    localStorage.removeItem("content");
  }
});
