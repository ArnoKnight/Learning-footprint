<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-container::-webkit-scrollbar,
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}
</style>
