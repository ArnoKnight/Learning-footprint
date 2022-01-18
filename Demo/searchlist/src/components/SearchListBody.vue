<template>
  <div class="bodyBox">
    <div class="title">
      <div>事项列表管理</div>
    </div>
    <div class="bodyBoxContent">
      <AddThing />
      <ThingsList />
      <div class="dogImg"><img :src="imgUrl" alt="" /></div>
    </div>
  </div>
</template>

<script>
import AddThing from "./AddThing.vue";
import ThingsList from "./ThingsList.vue";
export default {
  name: "SearchListBody",
  components: {
    AddThing,
    ThingsList,
  },
  data() {
    return {
      imgUrl: "",
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    getImg() {
      this.$axios.get("https://dog.ceo/api/breeds/image/random").then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          console.log(111);
          this.imgUrl = res.data.message;
        }
      });
    },
  },
};
</script>

<style>
.bodyBox {
  width: 980px;
  height: 600px;
  border: 2px solid #f1f3f4;
}
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  background-color: #d2691e;
  box-sizing: border-box;
  padding: 0 10px;
}

.bodyBoxContent {
  width: 100%;
  height: 100%;
}

/* .bodyBoxContent {
  margin: auto;
} */

.dogImg{
  width: 100px;
  height: 100px;
  margin: auto;
}

.dogImg img{
  width: 100px;
  height: 100px;
}
</style>