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
        <h4 class="dialog-title">新增家庭信息</h4>
      </template>
      <el-form
        class="info-form"
        :model="addDialog.infoForm.infoFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="addInfoRuleForm"
      >
        <el-form-item label="户主姓名" label-width="110px" prop="hserName">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.hserName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="户主身份证" label-width="110px" prop="hserCertno">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.hserCertno"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭人口数" label-width="110px" prop="fmPop">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.fmPop"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户银行" label-width="110px" prop="bankName">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.bankName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" label-width="110px" prop="bankacct">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.bankacct"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="医保区划" label-width="110px" prop="admdvs">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.admdvs"
            placeholder="请选择"
          >
            <el-option
              v-for="item in medicalInsuranceZoning"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
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
            :file-list="addDialog.infoForm.infoFormDate.attInfoCDTOList"
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
        <h4 class="dialog-title">家庭信息修改</h4>
      </template>
      <el-form
        class="edit-form"
        :model="editDialog.editFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="editInfoRuleForm"
      >
        <el-form-item label="户主姓名" label-width="110px" prop="hserName">
          <el-input
            v-model="editDialog.editFormDate.hserName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="户主身份证" label-width="110px" prop="hserCertno">
          <el-input
            v-model="editDialog.editFormDate.hserCertno"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭人口数" label-width="110px" prop="fmPop">
          <el-input
            v-model="editDialog.editFormDate.fmPop"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户银行" label-width="110px" prop="bankName">
          <el-input
            v-model="editDialog.editFormDate.bankName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" label-width="110px" prop="bankacct">
          <el-input
            v-model="editDialog.editFormDate.bankacct"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="医保区划" label-width="110px" prop="admdvs">
          <el-select
            v-model="editDialog.editFormDate.admdvs"
            placeholder="请选择"
          >
            <el-option
              v-for="item in medicalInsuranceZoning"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="附件"
          label-width="110px"
          style="width: 100%; height: 100%"
        >
          <el-upload
            :action="
              this.$http.defaults.baseURL +
              '/practice/familyinfo/attinfo/insertAtt'
            "
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :limit="5"
            :file-list="editDialog.editFormDate.attInfoCDTOList"
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
        <h4 class="dialog-title">家庭信息详情</h4>
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
        <el-form-item
          label="附件"
          label-width="110px"
          style="width: 100%; height: 100%"
        >
          <el-upload
            :action="
              this.$http.defaults.baseURL +
              '/practice/familyinfo/attinfo/insertAtt'
            "
            :on-preview="handlePreview"
            multiple
            :file-list="detailDialog.detailFormDate.attInfoCDTOList"
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
      primaryKey: 'reimId',
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
        infoForm: {
          infoFormDate: {
            hserName: '',
            hserCertno: '',
            fmPop: '',
            bankName: '',
            bankacct: '',
            admdvs: '',
            attInfoCDTOList: []
          },
          rules: {
            hserName: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            hserCertno: [
              { required: true, message: '请输入身份证', trigger: 'blur' },
              { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证', trigger: 'blur' }
            ],
            fmPop: [
              { required: true, message: '请输入家庭人口数', trigger: 'blur' }
            ],
            bankName: [
              { required: true, message: '请输入开户银行', trigger: 'blur' }
            ],
            bankacct: [
              { required: true, message: '请输入开户银行账号', trigger: 'blur' },
              { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请输入正确的身份证', trigger: 'blur' }
            ],
            admdvs: [
              { required: true, message: '请选择医保区划', trigger: 'change' }
            ]
          }
        }
      },
      editDialog: {
        editDialogVisible: false,
        editFormDate: {
          hserName: '',
          hserCertno: '',
          fmPop: '',
          bankName: '',
          bankacct: '',
          admdvs: '',
          attInfoCDTOList: []
        }
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
      // 医保区划
      medicalInsuranceZoning: [],
      // 搜索信息
      searchInfo: {
        hserCertno: '',
        hserName: '',
        chkStas: ''
      }
    }
  },
  methods: {
    // 搜索按钮
    selectBtn (item) {
      console.log(item)
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
    // 添加按钮提交
    addDialogSubmit (formName) {
      let fmBasInfoCDTO = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.addUpload.submit()
          fmBasInfoCDTO = this.addDialog.infoForm.infoFormDate
          this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/addFmBasInfo`, fmBasInfoCDTO
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
    // 获取医保区划
    getMedicalInsuranceZoning () {
      this.$http.get(`${this.$http.defaults.baseURL}/web/practice/sample/queryDicList/ADMDVS`
      ).then((res) => {
        this.medicalInsuranceZoning = res.data.data.data
      })
    },
    // 修改
    editDialogSubmit (formName) {
      let fmBasInfoCDTO = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fmBasInfoCDTO = this.editDialog.editFormDate
          this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/updateFmBasInfo`, fmBasInfoCDTO
          ).then((res) => {
            console.log(res)
            if (res.data.code === -1) {
              this.$message({
                type: 'error',
                message: res.data.message
              })
              return
            }
            if (res.data.code === 0) {
              this.selectBtn()
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
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
        this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/deleteFmBasInfo`, { fmId: row.fmId }
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
      this.addDialog.infoForm.infoFormDate.attInfoCDTOList.push(files.data)
      this.editDialog.editFormDate.attInfoCDTOList.push(files.data)
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
      this.addDialog.infoForm.infoFormDate.attInfoCDTOList.splice(this.addDialog.infoForm.infoFormDate.attInfoCDTOList.indexOf(file), 1)
      this.editDialog.editFormDate.attInfoCDTOList.splice(this.editDialog.editFormDate.attInfoCDTOList.indexOf(file), 1)
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
    this.getMedicalInsuranceZoning()
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
