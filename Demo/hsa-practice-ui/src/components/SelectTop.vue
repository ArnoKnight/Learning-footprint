<template>
  <div class="select-top">
    <div class="top-title">
      <div class="line"></div>
      <h4>查询条件</h4>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['titleTopName']
}
</script>

<style>
.select-top {
  padding: 20px;
  border-bottom: 20px solid #f0f2f5;
}

.top-title {
  /* width: 168px; */
  display: flex;
  align-items: center;
}

.line {
  width: 9px;
  height: 24px;
  margin-right: 10px;
  background-color: #1b65b8;
}
</style>
