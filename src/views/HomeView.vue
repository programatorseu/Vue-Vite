<script setup>
  import TabbableTextarea from "@/components/TabbableTextarea.vue";
  import {ref} from "vue";
  let comment = ref("test");
</script>
<template>
  <main>
    <form>
      <TabbableTextarea v-model="comment" style="width:100%; height:300px;"></TabbableTextarea>
    </form>
  </main>
</template>
