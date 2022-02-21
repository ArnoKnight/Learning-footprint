<template>
  <div class="page-box">
    <!-- 搜索 -->
    <SelectTop>
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
      ></MyTable>
    </SelectBody>
    <!-- 详情dialog -->
    <el-dialog
      :visible.sync="detailDialog.detailDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">家庭信息详情</h4>
      </template>
      <el-form
        class="edit-form"
        :model="detailDialog.detailFormDate"
        label-width="80px"
        ref="addInfoRuleForm"
      >
        <el-form-item label="诊断科室" label-width="110px" prop="hserName">
          <el-input
            v-model="detailDialog.detailFormDate.diagDept"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断时间" label-width="110px" prop="hserCertno">
          <el-input
            v-model="detailDialog.detailFormDate.diagTime"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断情况" label-width="110px" prop="fmPop">
          <el-input
            v-model="detailDialog.detailFormDate.diagInfo"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断机构" label-width="110px" prop="bankName">
          <el-input
            v-model="detailDialog.detailFormDate.diagInstis"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="报账费用" label-width="110px" prop="bankacct">
          <el-input
            v-model="detailDialog.detailFormDate.reimFee"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.paymtdAdjmText"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input
            type="textarea"
            v-model="detailDialog.detailFormDate.memo"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialog.detailDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="detailDialog.detailDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
        showSelection: false,
        // 操作单元格
        showTargetTable: true,
        // 编辑按钮
        showEditBtn: false,
        // 删除按钮
        showDeleteBtn: false,
        // 详情按钮
        showDetailsBtn: true,
        // 审核按钮
        showExamineBtn: false
      },
      // 控制表格生成需要展示的数据类型
      targetTable: [
        {
          targetTableWidth: '',
          targetTableProp: 'diagDept',
          targetTableLabel: '诊断科室'
        }, {
          targetTableWidth: '',
          targetTableProp: 'diagTime',
          targetTableLabel: '诊断时间'
        }, {
          targetTableWidth: '',
          targetTableProp: 'diagInfo',
          targetTableLabel: '诊断情况'
        }, {
          targetTableWidth: '',
          targetTableProp: 'diagInstis',
          targetTableLabel: '诊断机构'
        }, {
          targetTableWidth: '',
          targetTableProp: 'reimFee',
          targetTableLabel: '报账费用'
        }, {
          targetTableWidth: '',
          targetTableProp: 'paymtdAdjmText',
          targetTableLabel: '支付方式'
        }
      ],
      titleBodyName: '手工报账信息',
      // 控制主体按钮
      operationButton: {
        operationButtonName: '',
        operationButtonType: 'success',
        showOperationButton: false,
        clickBtn: () => {
          this.$bus.$emit('showDialog')
        }
      },
      selectForm: {
        householderName: '',
        householderId: ''
      },
      tableData: [],
      selectFormItem: {
        // 控制需要生成的输入框
        selectFormInput: [{
          label: '姓名',
          selectInput: {
            vModel: '',
            placeholder: '请输入姓名'
          }
        }, {
          label: '身份证',
          selectInput: {
            vModel: '',
            placeholder: '请输入身份证'
          }
        }]
      },
      detailDialog: {
        detailDialogVisible: false,
        detailFormDate: {
          diagDept: '',
          diagTime: '',
          diagInfo: '',
          diagInstis: '',
          reimFee: '',
          memo: '',
          paymtdAdjmText: ''
        }
      },
      // 搜索信息
      queryDto: {
        fmCard: '',
        fmName: ''
      }
    }
  },
  methods: {
    // 搜索按钮
    selectBtn (item) {
      console.log(item)
      if (item) {
        this.queryDto.fmCard = item.selectFormInput[1].vModel
        this.queryDto.fmName = item.selectFormInput[0].vModel
      }
      console.log(this.queryDto)
      if (this.queryDto.fmCard === undefined || this.queryDto.fmName === undefined) {
        return this.$message({
          type: 'error',
          message: '请输入姓名和身份证后查找！'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reim/selectReimInfo`, this.queryDto
      ).then((res) => {
        console.log(res)
        if (res.data.data === null) {
          this.$message({
            type: 'info',
            message: '暂无数据！'
          })
          return
        }
        res.data.data.forEach((item) => {
          if (item.paymtdAdjm === '0') {
            item.paymtdAdjmText = '银行转账'
          }
          if (item.paymtdAdjm === '1') {
            item.paymtdAdjmText = '现金'
          }
          if (item.paymtdAdjm === '2') {
            item.paymtdAdjmText = '其他'
          }
        })
        this.tableData = res.data.data
        if (item) {
          this.$message({
            type: 'success',
            message: '查询成功！'
          })
        }
      })
    },
    // 关闭dialog
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 点击上传成功文件回调
    handlePreview (files, fileList) {
      window.open(files.url, '_blank')
      // this.$http.post('http://172.16.65.127:8888/hsa-practice/practice/familyinfo/attinfo/download', fsFile
      // ).then((res) => {
      //   console.log(res)
      // })
    }
  },
  mounted () {
    this.$bus.$on('showDetailDialog', (row) => {
      this.detailDialog.detailFormDate = row
      this.detailDialog.detailDialogVisible = true
    })
  }
}
</script>

<style scoped>
.page-box {
  width: 100%;
  height: calc(100% - 92px);
  /* height: 100%; */
  box-sizing: border-box;
  /* background-color: pink; */
}

.el-select {
  width: 100%;
}

.table-button-box {
  display: flex;
}

.dialog-title {
  font-size: 20px;
  border-left: 9px solid #1b65b8;
  box-sizing: border-box;
  padding-left: 10px;
  color: #000000;
}

.top-title {
  /* width: 168px; */
  display: flex;
  align-items: center;
}

.line {
  width: 13px;
  height: 28px;
  margin-right: 10px;
  background-color: #1b65b8;
}

.select-form,
.info-form,
.edit-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.info-form {
  box-sizing: border-box;
}

.el-form-item {
  width: 48%;
}

.el-select {
  width: 100%;
}

.textarea-item {
  width: 100%;
  height: 150px;
}

.el-textarea >>> .el-textarea__inner {
  height: 150px;
  resize: none;
}
</style>
