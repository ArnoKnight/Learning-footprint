<template>
  <div class="thingsListBox">
    <div class="thingsList_title">
      <span>事项列表</span
      ><span style="color: red">未完成任务数：{{ noNum }}</span>
    </div>
    <ul>
      <ThingsItem
        v-for="(item, index) in thingsList"
        :key="item.id"
        :thingsList="{ item, index }"
      />
    </ul>
  </div>
</template>

<script>
import ThingsItem from "./ThingsItem.vue";
export default {
  name: "ThingsList",
  components: { ThingsItem },
  data() {
    return {
      thingsList: [],
      noNum: 0,
    };
  },
  created() {
    this.$Bus.$on("addItem", (res) => {
      this.thingsList.push(res);
      this.noNum++;
    });
  },
  mounted() {
    // 删除
    this.$Bus.$on("deleteId", (res) => {
      console.log("this.thingsList", this.thingsList);
      for (let i in this.thingsList) {
        if (this.thingsList[i].id == res) {
          this.thingsList.splice(i, 1);
        }
      }
      console.log(res);
      this.noNum--;
    });

    // 编辑
    this.$Bus.$on("editItem", (res) => {
      for (let i in this.thingsList) {
        if (this.thingsList[i].id == res.id) {
          this.thingsList[i].text = res.value;
        }
      }
      console.log(res);
    });

    // 完成
    this.$Bus.$on("okItem", (res) => {
      for (let i in this.thingsList) {
        if (this.thingsList[i].id == res.id) {
          this.thingsList[i].isOk = true;
        }
      }
      console.log(res);
      this.noNum--;
    });

    // 未完成
    this.$Bus.$on("noItem", (res) => {
      for (let i in this.thingsList) {
        if (this.thingsList[i].id == res.id) {
          this.thingsList[i].isOk = false;
        }
      }
      console.log(res);
      this.noNum++;
    });
  },
};
</script>

<style>
.thingsListBox {
  width: 100%;
  box-sizing: border-box;
  padding: 0 190px;
  margin-top: 30px;
}

.thingsList_title {
  display: flex;
  justify-content: space-between;
  width: 600px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-left: 5px solid #409eff;
  box-sizing: border-box;
  padding-left: 10px;
}

ul {
  padding: 0;
}
</style>