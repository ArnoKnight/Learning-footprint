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
        :primaryKey="primaryKey"
      ></MyTable>
    </SelectBody>
    <!-- 新增dialog -->
    <el-dialog
      :visible.sync="addDialog.addDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">查询个人信息</h4>
      </template>
      <el-form
        class="select-form"
        :model="addDialog.selectForm.selectFormDate"
        label-width="80px"
        :rules="addDialog.selectForm.rules"
        ref="addSelectRuleForm"
      >
        <el-form-item label="身份证" label-width="110px" prop="certno">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.certno"
            @change="enterInput('addSelectRuleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.psnName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.gend"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.mob"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.naty"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <h4 class="dialog-title">新增手工报账信息</h4>
      <el-form
        class="info-form"
        :model="addDialog.infoForm.infoFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="addInfoRuleForm"
      >
        <el-form-item label="诊断科室" label-width="110px" prop="diagDept">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.diagDept"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in diagnosticDepartment"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="诊断时间"
          label-width="110px"
          prop="diagTimeString"
        >
          <el-date-picker
            v-model="addDialog.infoForm.infoFormDate.diagTimeString"
            type="date"
            placeholder="选择日期"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="诊断情况" label-width="110px" prop="diagInfo">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.diagInfo"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断机构" label-width="110px" prop="diagInstis">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.diagInstis"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="报账费用" label-width="110px" prop="reimFee">
          <el-input
            v-model.number="addDialog.infoForm.infoFormDate.reimFee"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式" label-width="110px" prop="paymtdAdjm">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.paymtdAdjm"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in addDialog.infoForm.paymtdAdjmOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input
            type="textarea"
            v-model="addDialog.infoForm.infoFormDate.memo"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="附件"
          label-width="110px"
          style="width: 100%; height: 100%"
        >
          <el-upload
            ref="addUpload"
            :action="
              this.$http.defaults.baseURL +
              '/practice/familyinfo/attinfo/insertAtt'
            "
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="addDialog.infoForm.infoFormDate.attInfoList"
          >
            <el-button size="small" type="primary" slot="trigger"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogCancel()">取 消</el-button>
        <el-button type="primary" @click="addDialogSubmit('addInfoRuleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改dialog -->
    <el-dialog
      :visible.sync="editDialog.editDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">手工报账信息修改</h4>
      </template>
      <el-form
        class="info-form"
        :model="editDialog.editFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="editInfoRuleForm"
      >
        <el-form-item label="诊断科室" label-width="110px" prop="diagDept">
          <el-select
            v-model="editDialog.editFormDate.diagDept"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in diagnosticDepartment"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="诊断时间"
          label-width="110px"
          prop="diagTimeString"
        >
          <el-date-picker
            v-model="editDialog.editFormDate.diagTimeString"
            type="date"
            placeholder="选择日期"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="诊断情况" label-width="110px" prop="diagInfo">
          <el-input
            v-model="editDialog.editFormDate.diagInfo"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="诊断机构" label-width="110px" prop="diagInstis">
          <el-input
            v-model="editDialog.editFormDate.diagInstis"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="报账费用" label-width="110px" prop="reimFee">
          <el-input
            v-model.number="editDialog.editFormDate.reimFee"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式" label-width="110px" prop="paymtdAdjm">
          <el-select
            v-model="editDialog.editFormDate.paymtdAdjm"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in addDialog.infoForm.paymtdAdjmOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input
            type="textarea"
            v-model="editDialog.editFormDate.memo"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="附件"
          label-width="110px"
          style="width: 100%; height: 100%"
        >
          <el-upload
            ref="addUpload"
            :action="
              this.$http.defaults.baseURL +
              '/practice/familyinfo/attinfo/insertAtt'
            "
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="editDialog.editFormDate.attInfoList"
          >
            <el-button size="small" type="primary" slot="trigger"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog.editDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="editDialogSubmit('editInfoRuleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 详情dialog -->
    <el-dialog
      :visible.sync="detailDialog.detailDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <template slot="title">
        <h4 class="dialog-title">手工报账详情</h4>
      </template>
      <el-form
        class="info-form"
        :model="detailDialog.editFormDate"
        label-width="80px"
      >
        <el-form-item label="诊断科室" label-width="110px">
          <el-input
            v-model="detailDialog.detailFormDate.diagInstis"
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
            v-model.number="detailDialog.detailFormDate.reimFee"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式" label-width="110px">
          <el-input
            v-model.number="detailDialog.detailFormDate.paymtdAdjm"
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
        <el-form-item
          label="附件"
          label-width="110px"
          style="width: 100%; height: 100%"
        >
          <el-upload
            ref="addUpload"
            :action="
              this.$http.defaults.baseURL +
              '/practice/familyinfo/attinfo/insertAtt'
            "
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="editDialog.editFormDate.attInfoList"
          >
            <el-button size="small" type="primary" slot="trigger"
              >点击上传</el-button
            >
          </el-upload>
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
        showEditBtn: true,
        // 删除按钮
        showDeleteBtn: true,
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
          targetTableProp: 'diagTimeString',
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
        operationButtonName: '新增',
        operationButtonType: 'success',
        showOperationButton: true,
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
      // 控制addDialog显示隐藏
      addDialog: {
        addDialogVisible: false,
        selectForm: {
          selectFormDate: {
            certno: '',
            psnName: '',
            gend: '',
            mob: '',
            naty: ''
          },
          rules: {
            certno: [
              { required: true, message: '请输入身份证', trigger: 'blur' },
              { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证', trigger: 'blur' }
            ]
          }
        },
        infoForm: {
          infoFormDate: {
            diagDept: '',
            diagTimeString: '',
            diagInfo: '',
            diagInstis: '',
            reimFee: '',
            memo: '',
            paymtdAdjm: '',
            attInfoList: []
          },
          rules: {
            diagDept: [
              { required: true, message: '请输入诊断科室', trigger: 'blur' }
            ],
            diagTimeString: [
              { required: true, message: '请输入诊断时间', trigger: 'blur' }
            ],
            diagInfo: [
              { required: true, message: '请输入诊断情况', trigger: 'blur' }
            ],
            diagInstis: [
              { required: true, message: '请输入诊断机构', trigger: 'blur' }
            ],
            reimFee: [
              { required: true, message: '请输入报账费用', trigger: 'blur' },
              { type: 'number', message: '请确认您输入的报账格式是否正确' }
            ],
            paymtdAdjm: [
              { required: true, message: '请选择支付方式', trigger: 'change' }
            ]
          },
          paymtdAdjmOption: [{
            label: '银行转账',
            value: '0'
          }, {
            label: '现金',
            value: '1'
          }, {
            label: '其他',
            value: '2'
          }]
        }
      },
      editDialog: {
        editDialogVisible: false,
        editFormDate: {
          diagDept: '',
          diagTime: '',
          diagInfo: '',
          diagInstis: '',
          reimFee: '',
          memo: '',
          paymtdAdjmText: '',
          attInfoList: []
        }
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
          paymtdAdjmText: '',
          attInfoList: []
        }
      },
      // 诊断科室
      diagnosticDepartment: [],
      // 搜索信息
      searchInfo: {
        certno: '',
        name: '',
        chkStats: ''
      },
      primaryKey: 'reimId',
      res: {}
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
          message: '为了保护用户隐私，请输入姓名和身份证后再查询！'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/selectReimInfo?certno=${this.searchInfo.certno}&name=${this.searchInfo.name}&chkStats=${this.searchInfo.chkStats}`
      ).then((res) => {
        console.log('res', res)
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
    enterInput (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(`${this.$http.defaults.baseURL}/fmMemInfoC/selectByCertNo?certno=${this.addDialog.selectForm.selectFormDate.certno}`).then((res) => {
            this.res = res.data.data
            this.addDialog.selectForm.selectFormDate.psnName = res.data.data.psnName
            this.addDialog.selectForm.selectFormDate.gend = res.data.data.gend
            this.addDialog.selectForm.selectFormDate.mob = res.data.data.mob
            this.addDialog.selectForm.selectFormDate.natRegnCode = res.data.data.natRegnCode
            this.addDialog.selectForm.selectFormDate.naty = res.data.data.naty
          }).catch((error) => {
            console.log(error)
          })
        } else {
          console.log('查询失败，请联系管理员！！！')
          return false
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
    // 添加按钮提交
    addDialogSubmit (formName) {
      let reimInfo = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addDialog.infoForm.infoFormDate)
          this.$refs.addUpload.submit()
          reimInfo = this.addDialog.infoForm.infoFormDate
          reimInfo.fmId = this.res.fmId
          reimInfo.fmMemId = this.res.fmMenId
          console.log('this.res', this.res)
          if (reimInfo.fmId === undefined || reimInfo.fmMemId === undefined) {
            return this.$message({
              type: 'error',
              message: '请先查询您要添加的用户信息'
            })
          }
          this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/addRecord`, reimInfo
          ).then((res) => {
            console.log(res)
            if (res.data.code === '-1') {
              this.$message.error({
                type: 'error',
                message: res.data.message
              })
              return
            }
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
            }
          })
          this.addDialog.addDialogVisible = false
          this.$refs.addInfoRuleForm.resetFields()
        } else {
          return false
        }
      })
    },
    // 添加按钮取消
    addDialogCancel () {
      this.addDialog.addDialogVisible = false
      this.$refs.addInfoRuleForm.resetFields()
    },
    // 获取诊断科室
    getDiagnosticDepartment () {
      this.$http.get(`${this.$http.defaults.baseURL}/web/practice/sample/queryDicList/DEPT`
      ).then((res) => {
        this.diagnosticDepartment = res.data.data.data
      })
    },
    // 修改
    editDialogSubmit (formName) {
      let reimInfo = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.addUpload.submit()
          reimInfo = this.editDialog.editFormDate
          this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/updateReimInfo`, reimInfo
          ).then((res) => {
            console.log(res)
            if (res.data.code === -1) {
              this.$message.error({
                type: 'error',
                message: res.data.message
              })
              return
            }
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.selectBtn()
            }
          })
          this.editDialog.editDialogVisible = false
          this.$refs.editInfoRuleForm.resetFields()
        } else {
          return false
        }
      })
    },
    deleteBtn (row) {
      this.$confirm('是否删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`${this.$http.defaults.baseURL}/reimInfo/deleteReimInfo/${row.reimId}`
        ).then((res) => {
          console.log(res)
          if (res.data.code === -1) {
            this.$message({
              type: 'error',
              message: res.data.message
            })
            return
          }
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.selectBtn()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 上传文件成功回调
    handleSuccess (files, fileList) {
      this.addDialog.infoForm.infoFormDate.attInfoList.push(files.data)
      this.editDialog.editFormDate.attInfoList.push(files.data)
    },
    // 点击上传成功文件回调
    handlePreview (files, fileList) {
      window.open(files.url, '_blank')
      // this.$http.post('http://172.16.65.127:8888/hsa-practice/practice/familyinfo/attinfo/download', fsFile
      // ).then((res) => {
      //   console.log(res)
      // })
    },
    // 文件移除前回调
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 文件移除时的回调
    handleRemove (file) {
      this.addDialog.infoForm.infoFormDate.attInfoList.splice(this.addDialog.infoForm.infoFormDate.attInfoList.indexOf(file), 1)
      this.editDialog.editFormDate.attInfoList.splice(this.editDialog.editFormDate.attInfoList.indexOf(file), 1)
    }
  },
  mounted () {
    // dialog显示
    this.$bus.$on('showDialog', () => {
      this.addDialog.addDialogVisible = true
    })
    this.$bus.$on('showEditDialog', (row) => {
      this.editDialog.editFormDate = row
      this.editDialog.editDialogVisible = true
    })
    this.$bus.$on('showDetailDialog', (row) => {
      this.detailDialog.detailFormDate = row
      this.detailDialog.detailDialogVisible = true
    })
    this.getDiagnosticDepartment()
    this.$bus.$on('deleteBtn', (row) => {
      this.deleteBtn(row)
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
  padding-top: 40px;
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

.el-date-editor {
  width: 100%;
}
</style>
