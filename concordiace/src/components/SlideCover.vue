<template>
  <div id="outer-square">   
      <div id="inner-square">
          <h1>{{title}}</h1>
          <h2>{{author}}</h2>
      </div>
  </div>
</template>

<script>
export default {
  name: 'slide-cover',
  props: {
    title: String,
    author: String
  }
}
</script>

<style scoped>
  body {
      font-size: 16px;
  }

  #outer-square {
      color: #fff;
      font-family: sans-serif;
      background-color: #42b883;
      width: 450px;
      height: 450px;
      margin: auto;
      text-align: center;
      padding: 30px 30px 38px;
      transform: translateY(50%);
  }

  #inner-square {
      height: 100%;
      border: 4px solid #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
  }

  #inner-square h1 {
      font-size: 3.2em;
      font-weight: bold;
  }

  #inner-square h2 {
      font-size: 2em;
      font-weight: normal;
  }
</style>
