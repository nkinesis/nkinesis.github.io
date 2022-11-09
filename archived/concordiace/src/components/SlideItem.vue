<template>
  <li v-if="type == 'text'">{{ content }}</li>
  <li v-if="type == 'link'">
    <a :href="href" target="_blank">{{ content }}</a>
  </li>
</template>

<script>
export default {
  name: "slide-list-item",
  props: {
    type: String,
    content: String,
    href: String,
  },
  beforeMount() {
    console.log("Salut! Let's create a list item.")
  },
  mounted() {
    console.log("A list item was drawn on the screen.")
  },
  beforeUnmount() {
    console.log("Au revoir! Let's remove a list item.")
  }
};
</script>

<style>
li {
  color: #51575d;
  font-size: 2.2em;
  line-height: 1.5em;
}

li a {
  color: #42b883;
}
</style>
