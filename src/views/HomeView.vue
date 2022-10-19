<script>
import {useFlash} from "@/composables/useFlash";
export default {
  setup() {
    let {flash} = useFlash();
    return {flash};
  }
}
</script>
<template>
  <main>
    <TheWelcome />

    <button @click="flash('Yo !! ','Ania', 'info')">click me</button>
  </main>
</template>
