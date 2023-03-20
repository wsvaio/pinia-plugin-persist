<script setup lang="ts">
import store from "./store";
const main = store();
</script>

<template>
  <h1>Hello World !</h1>
  <h2>{{ main.count }}</h2>
  <button @click="main.count++">
    +
  </button>
</template>
