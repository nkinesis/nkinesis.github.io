<template>
  <template v-if="currentSlide == 1">
    <SlideCover title="Vue.js Basics" author="Gabriel C. Ullmann" />
  </template>

  <template v-if="currentSlide == 2">
    <Slide :items="content.slides[0]" />

    <div class="elements-around">
      <img src="./assets/vue-github.png" alt="Github page" />
      <img src="./assets/logo.png" alt="Logo" />
    </div>
  </template>

  <template v-if="currentSlide == 3">
    <Slide :items="content.slides[1]" />

    <div class="elements-center">
      <img src="./assets/logo.png" alt="Logo" />
    </div>
  </template>

  <template v-if="currentSlide == 4">
    <Slide :items="content.slides[2]" />

    <div class="elements-center">
      <img src="./assets/comp-tree.png" alt="Component Tree" />
    </div>
  </template>

  <template v-if="currentSlide == 5">
    <Slide :items="content.slides[3]" />

    <div class="elements-center">
      <BasicComponent name="Gabriel" :age=25 />
    </div>
  </template>

  <template v-if="currentSlide == 6">
    <Slide :items="content.slides[4]" />

    <div class="elements-center">
      <img src="./assets/vue-lifecycle.png" alt="Vue Lifecycle diagram" />
    </div>
  </template>

  <template v-if="currentSlide == 7">
    <Slide :items="content.slides[5]" />

    <div class="events inline" @click="counter++">
      This element listens to clicks, and was clicked {{ counter }} times.
    </div>

    <div class="events method" @click="changeCounter">
      This element subtracts the clicks from the one above.
    </div>
  </template>

  <template v-if="currentSlide == 8">
    <Slide :items="content.slides[6]"/>
    <div class="elements-center">
      <BasicComponentEvent @test-click="showMessage" name="Gabriel" :age=25 />
    </div>
  </template>

  <template v-if="currentSlide == 9">
    <SlideCover title="Thank you!" author="g_cavalh@live.concordia.ca" />
  </template>
</template>

<script>
import content from "./assets/content.json";
import Slide from "./components/Slide.vue";
import SlideCover from "./components/SlideCover.vue";
import BasicComponent from "./components/BasicComponent.vue";
import BasicComponentEvent from "./components/BasicComponentEvent.vue";
export default {
  name: "App",
  data() {
    return {
      counter: 0,
      currentSlide: 1,
      maxSlides: 9,
      content: content,
    };
  },
  methods: {
    changeCounter: function () {
      if (this.counter > 0) {
        this.counter--
      }
    },
    showMessage: function() {
      alert('Aha! You clicked it!');
    }
  },
  mounted() {
    let vm = this;
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          vm.currentSlide != 1 ? vm.currentSlide-- : vm.currentSlide
          break
        case 39:
          vm.currentSlide < vm.maxSlides ? vm.currentSlide++ : vm.currentSlide
          break
      }
    };
  },
  components: {
    Slide,
    SlideCover,
    BasicComponent,
    BasicComponentEvent,
  },
};
</script>

<style>
body {
  font-family: sans-serif;
}
.elements-around {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.elements-center {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: center;
}

.events {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: center;
  background-color: #42b883;
  height: 200px;
  align-items: center;
  color: #fff;
  font-weight: bold;
  user-select: none;
  font-size: 1.5em;
}

.inline {
  background-color: #42b883;
}

.method {
  background-color: #52b086;
}
</style>
