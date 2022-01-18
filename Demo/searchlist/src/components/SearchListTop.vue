<template>
  <div style="textalign: center">
    <div class="seatchListTop_title">
      <img src="../assets/logo.png" alt="" />
      <h2>2022前端校招生Vue学习实践测试</h2>
    </div>
    <div class="icon">
      作者：xxx &nbsp;&nbsp; 作品名：searchList &nbsp;&nbsp;
      完成时间：2022/1/12 &nbsp;&nbsp; 阅读量：1W
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "SearchListTop",
  data() {
    return {};
  },
};
</script>

<style>
.seatchListTop_title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.seatchListTop_title img {
  width: 40px;
  height: 40px;
}

.icon{
  text-align: center;
}
</style>