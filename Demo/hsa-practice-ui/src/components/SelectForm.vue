<template>
  <el-form label-width="90px" label-position="left" class="select-form">
    <el-form-item
      v-for="(item, index) in selectFormItem.selectFormInput"
      :key="index"
      :label="item.label"
      class="form-input"
    >
      <el-input
        v-model="item.vModel"
        :placeholder="item.selectInput.placeholder"
        size="small"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="审核状态"
      v-if="selectFormItem.selectFormSelect ? true : false"
    >
      <el-select
        v-model="selectFormItem.selectFormSelect.vModel"
        placeholder="请选择"
        size="small"
      >
        <el-option
          v-for="item in selectFormItem.selectFormSelect.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <div class="operation-button-box">
      <el-button @click="resetBtn" size="mini">重置</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="selectBtn(selectFormItem, $event)"
        >查询</el-button
      >
    </div>
  </el-form>
</template>

<script>
export default {
  props: ['selectFormItem', 'selectBtn'],
  methods: {
    resetBtn () {
      this.selectFormItem.selectFormInput.forEach(item => {
        item.vModel = ''
      })
      this.selectFormItem.selectFormSelect.vModel = ''
    }
  }
}
</script>

<style scoped>
.select-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0px 0px 0px;
}

.form-input {
  flex: 1;
  margin-right: 30px;
}

.el-form-item{
  margin: 0;
  margin-right: 20px;
}

.el-form-item >>> .el-form-item__label {
  text-align: center;
}

.operation-button-box {
  width: 163px;
  /* display: flex; */
  padding: 0px 0 0 20px;
  /* padding-left: 20px; */
}
</style>
