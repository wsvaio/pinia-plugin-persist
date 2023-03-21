import { defineStore } from "pinia";

export default defineStore("main", {
  state: () => ({
    count: 0,
  }),
  persist: [
    {
      setter(key, value) {
        console.log(this);

        return localStorage.setItem(key, JSON.stringify(value));
      },
    },
    {
      setter(key, value) {
        console.log(this);

        return localStorage.setItem(key, JSON.stringify(value));
      },
    },
    {
      setter(key, value) {
        console.log(this);

        return localStorage.setItem(key, JSON.stringify(value));
      },
    },
    {
      setter(key, value) {
        console.log(this);

        return localStorage.setItem(key, JSON.stringify(value));
      },
    },
  ],
});
