<template>
  <div class="addTingBox">
    <div class="addthing_title">添加事项</div>
    <input
      type="text"
      class="searchInput"
      placeholder="请输入事项名称，回车即可添加任务"
      v-on:keyup.enter="search"
      v-model="inputValue"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "AddThing",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    search(e) {
      console.log(e);
      this.$Bus.$emit("addItem", {
        id: nanoid(),
        text: this.inputValue,
        isOk: false,
      });
      this.inputValue = "";
    },
  },
};
</script>

<style>
.addTingBox {
  width: 100%;
  box-sizing: border-box;
  padding: 0 190px;
  margin-top: 30px;
}

.addthing_title {
  width: 600px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-left: 5px solid #409eff;
  box-sizing: border-box;
  padding-left: 10px;
}

.searchInput {
  width: 600px;
  height: 30px;
}
</style>