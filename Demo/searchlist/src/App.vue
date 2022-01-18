<template>
  <div id="app" class="app">
    <SearchListTop />
    <SearchListBody />
  </div>
</template>

<script>
import SearchListTop from "./components/SearchListTop.vue";
import SearchListBody from "./components/SearchListBody.vue";

export default {
  name: "App",
  components: {
    SearchListTop,
    SearchListBody,
  },
};
</script>

<style>
.app {
  width: 1000px;
  height: 1000px;
  margin: auto;
}
</style>
