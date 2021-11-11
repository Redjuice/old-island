<script setup>
import { ref } from 'vue'
import { Button } from 'vant';


defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <Button type="primary">Hello Vant</Button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
