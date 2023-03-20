import { defineStore } from "pinia";

export default defineStore("main", {
  state: () => ({
    count: 0,
  }),
  persist: true,
});
