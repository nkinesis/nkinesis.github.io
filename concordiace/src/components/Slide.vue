<template>
  <div class="slide-wrapper">
    <h1>{{ items.title }}</h1>
    <ul>
      <template v-for="(item, index) in items.items" v-bind:key="index">
        <SlideItem
          :type="item.type"
          :content="item.content"
          :href="item.href ? item.href : null"
        />
      </template>
    </ul>
  </div>
</template>

<script>
import SlideItem from "./SlideItem.vue";
export default {
  name: "slide-list",
  props: {
    items: Object,
  },
  components: {
    SlideItem,
  },
  methods: {
    tellFriend: function () {
      alert("Aha! You clicked!");
    },
  },
};
</script>

<style scoped>
.slide-wrapper {
  padding: 80px;
}
h1 {
  color: #42b883;
  font-size: 3.2em;
  font-weight: bold;
}
</style>
