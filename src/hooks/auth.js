// src/stores/content.js
import { writable } from "svelte/store";

const stored = localStorage.content;

export const store = writable(stored || null);

store.subscribe((value) => (localStorage.content = value));
