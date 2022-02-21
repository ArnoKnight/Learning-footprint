<template>
  <div class="select-info">
    <div class="body-top">
      <div class="top-title">
        <div class="line"></div>
        <h4>{{ titleBodyName }}</h4>
      </div>
      <el-button
        v-if="operationButton.showOperationButton"
        :type="operationButton.operationButtonType"
        size="mini"
        @click="operationButton.clickBtn()"
        >{{ operationButton.operationButtonName }}</el-button
      >
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['titleBodyName', 'operationButton']
}
</script>

<style scoped>
.select-info {
  padding: 20px;
  height: calc(100% - 144px);
  box-sizing: border-box;
}

.body-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-title {
  /* width: 124px; */
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
