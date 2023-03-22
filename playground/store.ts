import { defineStore } from "pinia";

export default defineStore("main", {
  state: () => ({
    count: 0,
    cba: {
      abc: 123,
      a: 312,
      asdjf: {
        asf: 123,
      },
      asjdf: [123, 123, 5435, 643],
    },
  }),
  persist: [
    {
      includes: ["count", "cba.asjdf.1"],
      setter(key, value) {
        console.log(this);

        return localStorage.setItem(key, JSON.stringify(value));
      },
    },
  ],
});
