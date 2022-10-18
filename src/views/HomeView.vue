<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import { ref } from "vue";
let message = ref("Hello World");

let popup = () => {
  alert('popup message');
}

setTimeout(() => {
  message.value = "I have been Changed";
}, 2000);

</script>

<template>
  <main>
    <TheWelcome />
    <p>{{message}}</p>
    <button @click="popup">click me</button>
    <p>
      <input type="text" v-model="message" />
    </p>
  </main>
</template>
