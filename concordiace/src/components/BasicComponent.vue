<template>
  <p>Hello, my name is {{name}} and I'm {{age}}.</p>
</template>

<script>
export default {
  name: 'basic-component',
  props: {
    name: String,
    age: Number
  }
}
</script>

<style scoped>
  p {
    color: #51575d;
    font-size: 3.2em;
    text-decoration: underline;
  }
</style>
