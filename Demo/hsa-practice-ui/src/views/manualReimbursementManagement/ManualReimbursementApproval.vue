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
      ><MRTable
        :tableData="tableData"
        :targetTable="targetTable"
        :showTableItem="showTableItem"
        :isclearSelection="isclearSelection"
        :primaryKey="primaryKey"
      ></MRTable>
    </SelectBody>
    <!-- 批量审核dialog -->
    <el-dialog
      :visible.sync="examineAllDialog.examineAllDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">批量审核</h4>
      </template>
      <el-form class="info-form" label-width="80px">
        <el-form-item class="textarea-item" label="审核意见" label-width="90px">
          <el-input
            type="textarea"
            v-model="examineAllDialog.examineOpinion"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="examineDialogAllCancel()">取 消</el-button>
        <el-button type="success" @click="examineDialogAllSubmit()"
          >审核通过</el-button
        >
        <el-button type="info" @click="examineDialogAllSubmitNo()"
          >审核不通过</el-button
        >
      </span>
    </el-dialog>
    <!-- 审核详情dialog -->
    <el-dialog
      :visible.sync="detailDialog.detailDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">手工报账详情</h4>
      </template>
      <el-form
        class="edit-form"
        :model="detailDialog.detailFormDate"
        label-width="80px"
        ref="addInfoRuleForm"
      >
        <el-form-item label="诊断科室" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.diagDept"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断时间" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.diagTimeStringText"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断情况" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.diagInfo"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断机构" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.diagInstis"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="报账费用" label-width="110px">
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
        <el-button type="primary" @click="examine">审 核</el-button>
      </span>
    </el-dialog>
    <!-- 审核dialog -->
    <el-dialog
      :visible.sync="examineDialog.examineDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">审核</h4>
      </template>
      <el-form class="info-form" label-width="80px">
        <el-form-item class="textarea-item" label="审核意见" label-width="90px">
          <el-input
            type="textarea"
            v-model="examineDialog.examineOpinion"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="examineDialogCancel()">取 消</el-button>
        <el-button type="success" @click="examineDialogSubmit()"
          >审核通过</el-button
        >
        <el-button type="info" @click="examineDialogSubmitNo('examineRuleForm')"
          >审核不通过</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectTop from '../../components/SelectTop.vue'
import SelectBody from '../../components/SelectBody.vue'
import MRTable from '../../components/MRTable.vue'
import SelectForm from '../../components/SelectForm.vue'
export default {
  components: {
    SelectTop,
    SelectBody,
    MRTable,
    SelectForm
  },
  data () {
    return {
      primaryKey: 'reimId',
      // 控制表格部分单元格的展示
      showTableItem: {
        // 选择框
        showSelection: true,
        // 操作单元格
        showTargetTable: true,
        // 编辑按钮
        showEditBtn: false,
        // 删除按钮
        showDeleteBtn: false,
        // 详情按钮
        showDetailsBtn: false,
        // 审核按钮
        showExamineBtn: true
      },
      // 控制表格生成需要展示的数据类型
      targetTable: [
        {
          targetTableWidth: '',
          targetTableProp: 'diagDept',
          targetTableLabel: '诊断科室'
        }, {
          targetTableWidth: '',
          targetTableProp: 'diagTimeStringText',
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
        }, {
          targetTableWidth: '',
          targetTableProp: 'chkStatsText',
          targetTableLabel: '审核状态'
        }
      ],
      titleTopName: '查询家庭信息',
      titleBodyName: '家庭信息',
      // 控制主体按钮
      operationButton: {
        operationButtonName: '批量审核',
        operationButtonType: 'primary',
        showOperationButton: true,
        clickBtn: () => {
          // if (this.reimIdLists.length === 0) {
          //   return this.$message({
          //     type: 'error',
          //     message: '请选择您要批量审核的信息'
          //   })
          // }
          console.log(this.reimIdLists.length)
          this.$bus.$emit('showDialog')
        }
      },
      selectForm: {
        fmName: '',
        fmCard: ''
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
        }],
        // 控制搜索框
        selectFormSelect: {
          vModel: '',
          options: [{
            value: 0,
            label: '未审核'
          }, {
            value: 1,
            label: '审核通过'
          }, {
            value: 2,
            label: '审核未通过'
          }]
        }
      },
      // 控制examineDialog显示隐藏
      examineAllDialog: {
        examineAllDialogVisible: false,
        examineOpinion: ''
      },
      detailDialog: {
        detailDialogVisible: false,
        detailFormDate: {
          hserName: '',
          hserCertno: '',
          fmPop: '',
          bankName: '',
          bankacct: '',
          admdvs: '',
          attInfoCDTOList: []
        }
      },
      // 搜索信息
      searchInfo: {
        certno: '',
        name: '',
        chkStats: ''
      },
      // 控制examineDialog显示隐藏
      examineDialog: {
        examineDialogVisible: false,
        examineOpinion: ''
      },
      reimIdLists: [],
      isclearSelection: false
    }
  },
  methods: {
    // 搜索按钮
    selectBtn (item) {
      console.log(item)
      if (item) {
        this.searchInfo.certno = item.selectFormInput[1].vModel
        this.searchInfo.name = item.selectFormInput[0].vModel
        this.searchInfo.chkStats = item.selectFormSelect.vModel
      }
      if (this.searchInfo.certno === undefined || this.searchInfo.name === undefined) {
        return this.$message({
          type: 'error',
          message: '请输入姓名和身份证后查找！'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/selectReimInfoToChkStats?certno=${this.searchInfo.certno}&chkStats=${this.searchInfo.chkStats}&name=${this.searchInfo.name}`
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
          if (item.chkStats === '0') {
            item.chkStatsText = '未审核'
          }
          if (item.chkStats === '1') {
            item.chkStatsText = '审核通过'
          }
          if (item.chkStats === '2') {
            item.chkStatsText = '审核不通过'
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
    // 批量审核通过
    examineDialogAllSubmit () {
      if (!this.examineAllDialog.examineOpinion) {
        return this.$message({
          type: 'error',
          message: '请输入审批意见'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/updateCheckStatusBatch/1/${this.examineAllDialog.examineOpinion}`, this.reimIdLists
      ).then((res) => {
        if (res.data.code === 0) {
          this.selectBtn()
          this.$message({
            type: 'success',
            message: '批量审批成功！'
          })
          this.$bus.$emit('clearAllCheckBox')
          this.$bus.$emit('clearreimIdLists')
        }
        this.examineAllDialog.examineOpinion = ''
        this.examineAllDialog.examineAllDialogVisible = false
      })
    },
    // 批量审核不通过
    examineDialogAllSubmitNo () {
      if (!this.examineAllDialog.examineOpinion) {
        return this.$message({
          type: 'error',
          message: '请输入审批意见'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/updateCheckStatusBatch/2/${this.examineAllDialog.examineOpinion}`, this.reimIdLists
      ).then((res) => {
        if (res.data.code === 0) {
          this.selectBtn()
          this.$message({
            type: 'success',
            message: '批量审批成功！'
          })
          this.$bus.$emit('clearAllCheckBoxNo')
          this.$bus.$emit('clearreimIdLists')
        }
      })
      this.examineAllDialog.examineOpinion = ''
      this.examineAllDialog.examineAllDialogVisible = false
    },
    // 批量审核dialog取消按钮
    examineDialogAllCancel () {
      this.examineAllDialog.examineOpinion = ''
      this.examineAllDialog.examineAllDialogVisible = false
    },
    // 审核通过提交
    examineDialogSubmit () {
      if (!this.examineDialog.examineOpinion) {
        return this.$message({
          type: 'error',
          message: '请输入审批意见'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/updateCheckStatus/${this.detailDialog.detailFormDate.reimId}/1/${this.examineDialog.examineOpinion}`
      ).then((res) => {
        console.log('res', res)
        if (res.data.code === 0) {
          this.selectBtn()
          this.$message({
            type: 'success',
            message: '审批成功！'
          })
        }
        this.examineDialog.examineOpinion = ''
        this.examineDialog.examineDialogVisible = false
        this.detailDialog.detailDialogVisible = false
      })
    },
    // 审核不通过
    examineDialogSubmitNo () {
      if (!this.examineDialog.examineOpinion) {
        return this.$message({
          type: 'error',
          message: '请输入审批意见'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/updateCheckStatus/${this.detailDialog.detailFormDate.reimId}/2/${this.examineDialog.examineOpinion}`
      ).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.selectBtn()
          this.$message({
            type: 'success',
            message: '审批成功！'
          })
        }
        this.examineDialog.examineOpinion = ''
        this.examineDialog.examineDialogVisible = false
        this.detailDialog.detailDialogVisible = false
      })
    },
    // 审核dialog取消按钮
    examineDialogCancel () {
      this.examineDialog.examineOpinion = ''
      this.examineDialog.examineDialogVisible = false
    },
    examine () {
      this.examineDialog.examineDialogVisible = true
    }
  },
  mounted () {
    // dialog显示
    this.$bus.$on('showDialog', () => {
      this.examineAllDialog.examineAllDialogVisible = true
    })
    this.$bus.$on('showExamineBtn', (row) => {
      this.detailDialog.detailFormDate = row
      this.detailDialog.detailDialogVisible = true
    })
    this.$bus.$on('getreimIdLists', (reimIdLists) => {
      console.log(reimIdLists)
      this.reimIdLists = reimIdLists
    })
  },
  beforeDestroy () {
    this.$bus.$off('showDialog')
    this.$bus.$off('showExamineBtn')
    // this.$bus.$off('getreimIdLists')
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
