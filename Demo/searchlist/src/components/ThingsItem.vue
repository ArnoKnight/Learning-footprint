<template>
  <li class="list_item">
    <div class="left">
      <span class="item_index">{{ thingsList.index + 1 }}</span>
      <input
        v-if="!flag"
        class="editInput"
        type="text"
        v-model="thingsList.item.text"
        ref="editItem"
      />
      <span v-if="flag" class="item">{{ thingsList.item.text }}</span>
    </div>
    <div v-if="!thingsList.item.isOk" class="right">
      <button @click="editItem(thingsList.item.id)">编辑</button>
      <button @click="deleteItem(thingsList.item.id, thingsList.item.isOk)">
        删除
      </button>
      <button @click="okItem(thingsList.item.id, thingsList.item.isOk)">
        完成
      </button>
    </div>
    <button v-if="thingsList.item.isOk" @click="noItem(thingsList.item.id)">
      标记未完成
    </button>
  </li>
</template>

<script scoped>
export default {
  name: "ThingsItem",
  props: ["thingsList"],
  data() {
    return {
      flag: true,
      editValue: "",
    };
  },
  methods: {
    // 编辑
    editItem(id) {
      this.flag = !this.flag;
      if (this.$refs.editItem) {
        console.log(this.$refs.editItem.value);
        this.$Bus.$emit("editItem", {
          id: id,
          value: this.$refs.editItem.value,
        });
      }
    },
    // 删除
    deleteItem(id) {
      console.log(this.thingsList);
      this.$Bus.$emit("deleteId", id);
    },
    // 完成
    okItem(id, isOk) {
      console.log(id);
      this.isOk = !this.isOk;
      this.$Bus.$emit("okItem", { id, isOk });
    },
    // 未完成
    noItem(id, isOk) {
      console.log(id);
      this.isOk = !this.isOk;
      this.$Bus.$emit("noItem", { id, isOk });
    },
  },
  mounted() {
    console.log(this.thingsList);
  },
};
</script>

<style>
li {
  list-style: none;
}

.list_item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.left {
  font-size: 16px;
}

.item_index {
  color: red;
  margin-right: 10px;
}

.item {
}

.right {
  display: flex;
  justify-content: space-between;
  width: 150px;
}
</style>