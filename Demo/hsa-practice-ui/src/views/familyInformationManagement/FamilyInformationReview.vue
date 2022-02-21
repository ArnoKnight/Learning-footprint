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
        :isclearSelection="isclearSelection"
        :primaryKey="primaryKey"
      ></MyTable>
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
        <h4 class="dialog-title">审 核</h4>
      </template>
      <el-form
        class="edit-form"
        :model="detailDialog.detailFormDate"
        label-width="80px"
        ref="addInfoRuleForm"
      >
        <el-form-item label="户主姓名" label-width="110px" prop="hserName">
          <el-input
            v-model="detailDialog.detailFormDate.hserName"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="户主身份证" label-width="110px" prop="hserCertno">
          <el-input
            v-model="detailDialog.detailFormDate.hserCertno"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭人口数" label-width="110px" prop="fmPop">
          <el-input
            v-model="detailDialog.detailFormDate.fmPop"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="开户银行" label-width="110px" prop="bankName">
          <el-input
            v-model="detailDialog.detailFormDate.bankName"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" label-width="110px" prop="bankacct">
          <el-input
            v-model="detailDialog.detailFormDate.bankacct"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="医保区划" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.admdvs"
            size="small"
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
      primaryKey: 'fmId',
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
          targetTableProp: 'hserName',
          targetTableLabel: '户主姓名'
        }, {
          targetTableWidth: '240',
          targetTableProp: 'hserCertno',
          targetTableLabel: '户主身份证'
        }, {
          targetTableWidth: '',
          targetTableProp: 'fmPop',
          targetTableLabel: '家庭人口数'
        }, {
          targetTableWidth: '',
          targetTableProp: 'admdvs',
          targetTableLabel: '医保区划'
        }, {
          targetTableWidth: '',
          targetTableProp: 'fmacctBalc',
          targetTableLabel: '家庭账户余额'
        }, {
          targetTableWidth: '',
          targetTableProp: 'chkStasText',
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
          if (this.fmIdList.length === 0) {
            return this.$message({
              type: 'error',
              message: '请选择您要批量审核的信息'
            })
          }
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
        hserCertno: '',
        hserName: '',
        chkStas: ''
      },
      // 控制examineDialog显示隐藏
      examineDialog: {
        examineDialogVisible: false,
        examineOpinion: ''
      },
      fmIdList: [],
      isclearSelection: false
    }
  },
  methods: {
    // 搜索按钮
    selectBtn (item) {
      if (item) {
        this.searchInfo.hserCertno = item.selectFormInput[1].vModel
        this.searchInfo.hserName = item.selectFormInput[0].vModel
        this.searchInfo.chkStas = item.selectFormSelect.vModel
      }
      this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/getByHserCertnoOrHserName?hserCertno=${this.searchInfo.hserCertno}&hserName=${this.searchInfo.hserName}&chkStas=${this.searchInfo.chkStas}`
      ).then((res) => {
        console.log(res)
        if (res.status !== 200) {
          this.$message({
            type: 'error',
            message: '查询失败，请确认网络是否正常！'
          })
          this.tableData = []
          return
        }
        if (item) {
          if (res.data.type === 'error') {
            this.$message({
              message: res.data.message
            })
            this.tableData = []
            return
          }
        }
        res.data.data.forEach((item) => {
          if (item.chkStas === '0') {
            item.chkStasText = '未审核'
          }
          if (item.chkStas === '1') {
            item.chkStasText = '审核通过'
          }
          if (item.chkStas === '2') {
            item.chkStasText = '审核未通过'
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
      this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/checkBatchFmBasInfo?chkOpnn=${this.examineAllDialog.examineOpinion}&chkStas=1`, this.fmIdList
      ).then((res) => {
        if (res.data.code === 0) {
          this.selectBtn()
          this.$message({
            type: 'success',
            message: '批量审批成功！'
          })
          this.$bus.$emit('clearAllCheckBox')
          this.$bus.$emit('clearFmIdList')
        }
        this.examineAllDialog.examineOpinion = ''
        this.examineAllDialog.examineAllDialogVisible = false
      })
    },
    // 批量审核不通过
    examineDialogAllSubmitNo () {
      this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/checkBatchFmBasInfo?chkOpnn=${this.examineAllDialog.examineOpinion}&chkStas=2`, this.fmIdList
      ).then((res) => {
        if (res.data.code === 0) {
          this.selectBtn()
          this.$message({
            type: 'success',
            message: '批量审批成功！'
          })
          this.$bus.$emit('clearAllCheckBoxNo')
          this.$bus.$emit('clearFmIdList')
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
      const fmBasInfoCDTO = {
        fmId: this.detailDialog.detailFormDate.fmId,
        chkOpnn: this.examineDialog.examineOpinion,
        chkStas: '1'
      }
      this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/checkFmBasInfo`, fmBasInfoCDTO
      ).then((res) => {
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
      const fmBasInfoCDTO = {
        fmId: this.detailDialog.detailFormDate.fmId,
        chkOpnn: this.examineDialog.examineOpinion,
        chkStas: '2'
      }
      console.log(fmBasInfoCDTO)
      this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/checkFmBasInfo`, fmBasInfoCDTO
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
    this.$bus.$on('getFmIdList', (fmIdList) => {
      console.log(fmIdList)
      this.fmIdList = fmIdList
    })
  },
  beforeDestroy () {
    this.$bus.$off('showDialog')
    this.$bus.$off('showExamineBtn')
    // this.$bus.$off('getFmIdList')
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
