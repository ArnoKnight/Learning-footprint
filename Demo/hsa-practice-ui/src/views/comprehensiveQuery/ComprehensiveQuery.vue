<template>
  <div class="page-box">
    <!-- 搜索 -->
    <SelectTop :titleTopName="titleTopName">
      <SelectForm
        :selectFormItem="selectFormItem"
        :selectBtn="selectBtn"
      ></SelectForm>
    </SelectTop>
    <!-- 搜索信息 -->
    <SelectBody
      :titleBodyName="titleBodyName"
      :operationButton="operationButton"
      ><MyTable
        :tableData="tableData"
        :targetTable="targetTable"
        :showTableItem="showTableItem"
      ></MyTable
    ></SelectBody>
  </div>
</template>

<script>
import SelectTop from '../../components/SelectTop.vue'
import SelectBody from '../../components/SelectBody.vue'
import MyTable from '../../components/MyTable.vue'
import SelectForm from '../../components/SelectForm.vue'
export default {
  components: {
    SelectTop,
    SelectBody,
    MyTable,
    SelectForm
  },
  data () {
    return {
      // 控制表格部分单元格的展示
      showTableItem: {
        // 选择框
        showSelection: true,
        // 操作单元格
        showTargetTable: true,
        // 编辑按钮
        showEditBtn: true,
        // 删除按钮
        showDeleteBtn: true,
        // 详情按钮
        showDetailsBtn: true
      },
      // 控制表格生成需要展示的数据类型
      targetTable: [
        {
          targetTableWidth: '',
          targetTableProp: 'householdName',
          targetTableLabel: '户主姓名'
        }, {
          targetTableWidth: '240',
          targetTableProp: 'householdId',
          targetTableLabel: '户主身份证'
        }, {
          targetTableWidth: '',
          targetTableProp: 'householdSex',
          targetTableLabel: '性别'
        }, {
          targetTableWidth: '',
          targetTableProp: 'householdPhone',
          targetTableLabel: '手机号'
        }, {
          targetTableWidth: '',
          targetTableProp: 'auditStatus',
          targetTableLabel: '审核状态'
        }
      ],
      titleTopName: '综合查询',
      titleBodyName: '综合查询详情',
      // 控制主体按钮
      operationButton: {
        showOperationButton: false
      },
      selectForm: {
        householderName: '',
        householderId: ''
      },
      value: '',
      tableData: [{
        householdName: '卓西',
        householdId: '494556499785462258',
        householdSex: '男',
        householdPhone: '15894685979',
        householdAccountBalance: '56195.00',
        auditStatus: '审核通过'
      }],
      selectFormItem: {
        // 控制需要生成的输入框
        selectFormInput: [{
          label: '户主姓名',
          selectInput: {
            vModel: '',
            placeholder: '请输入户主姓名'
          }
        }, {
          label: '户主身份证',
          selectInput: {
            vModel: '',
            placeholder: '请输入户主身份证'
          }
        }]
      },
      // 获取并处理后得到的的表格数据
      gainForm: {
        householderName: '',
        householderId: ''
      }
    }
  },
  methods: {
    selectBtn (item) {
      this.gainForm.householderName = item.selectFormInput[0].vModel
      this.gainForm.householderId = item.selectFormInput[1].vModel
      console.log(this.gainForm)
    }
  }
}
</script>

<style scoped>
.page-box {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}

.el-select {
  width: 100%;
}

.table-button-box {
  display: flex;
}
</style>
