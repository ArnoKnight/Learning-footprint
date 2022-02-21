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
        <h4 class="dialog-title">查询家庭信息</h4>
      </template>
      <el-form
        class="select-form"
        :model="addDialog.selectForm.selectFormDate"
        label-width="80px"
        :rules="addDialog.selectForm.rules"
        ref="addSelectRuleForm"
      >
        <el-form-item label="户主身份证" label-width="110px" prop="hserCertno">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.hserCertno"
            @change="enterInput('addSelectRuleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item label="户主姓名" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.hserName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭人口数" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.fmPop"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭账户余额" label-width="110px">
          <el-input
            v-model="addDialog.selectForm.selectFormDate.fmacctBalc"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <h4 class="dialog-title">新增家庭支出信息</h4>
      <el-form
        class="info-form"
        :model="addDialog.infoForm.infoFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="addInfoRuleForm"
      >
        <el-form-item label="姓名" label-width="110px" prop="name">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="110px" prop="certno">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.certno"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="支出金额" label-width="110px" prop="payFee">
          <el-input
            v-model.number="addDialog.infoForm.infoFormDate.payFee"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="支出机构" label-width="110px" prop="payInstis">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.payInstis"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input
            type="textarea"
            v-model="addDialog.infoForm.infoFormDate.incDetail"
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
            :file-list="addDialog.infoForm.infoFormDate.attInfoCDTOS"
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
        <h4 class="dialog-title">家庭支出信息修改</h4>
      </template>
      <el-form
        class="info-form"
        :model="editDialog.editFormDate"
        label-width="80px"
        :rules="editDialog.rules"
        ref="editInfoRuleForm"
      >
        <el-form-item label="支出" label-width="110px" prop="payFee">
          <el-input
            v-model.number="editDialog.editFormDate.payFee"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input
            type="textarea"
            v-model="editDialog.editFormDate.incDetail"
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
            :file-list="editDialog.editFormDate.attInfoCDTOS"
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
        <h4 class="dialog-title">家庭支出详情</h4>
      </template>
      <el-form
        class="info-form"
        :model="detailDialog.detailFormDate"
        label-width="80px"
      >
        <el-form-item label="支出" label-width="110px" prop="payFee">
          <el-input
            v-model="detailDialog.detailFormDate.payFee"
            disabled
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input
            type="textarea"
            v-model="detailDialog.detailFormDate.incDetail"
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
            :file-list="detailDialog.detailFormDate.attInfoCDTOS"
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
          targetTableProp: 'name',
          targetTableLabel: '姓名'
        }, {
          targetTableWidth: '',
          targetTableProp: 'gend',
          targetTableLabel: '性别'
        }, {
          targetTableWidth: '240',
          targetTableProp: 'certno',
          targetTableLabel: '身份证'
        }, {
          targetTableWidth: '',
          targetTableProp: 'payInstis',
          targetTableLabel: '支出机构'
        }, {
          targetTableWidth: '',
          targetTableProp: 'payFee',
          targetTableLabel: '支出金额'
        }, {
          targetTableWidth: '',
          targetTableProp: 'fmacctBalc',
          targetTableLabel: '余额'
        }
      ],
      titleBodyName: '家庭支出信息详情',
      // 控制主体按钮
      operationButton: {
        operationButtonName: '新增',
        operationButtonType: 'success',
        showOperationButton: true,
        clickBtn: () => {
          this.$bus.$emit('showDialog')
        }
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
        }]
      },
      // 控制addDialog显示隐藏
      addDialog: {
        addDialogVisible: false,
        selectForm: {
          selectFormDate: {
            hserCertno: '',
            hserName: '',
            fmPop: '',
            fmacctBalc: ''
          },
          rules: {
            hserCertno: [
              { required: true, message: '请输入户主身份证', trigger: 'blur' },
              { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证', trigger: 'blur' }
            ]
          }
        },
        infoForm: {
          infoFormDate: {
            name: '',
            certno: '',
            payFee: '',
            payInstis: '',
            incDetail: '',
            attInfoCDTOS: []
          },
          rules: {
            certno: [
              { required: true, message: '请输入身份证', trigger: 'blur' },
              { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证', trigger: 'blur' }
            ],
            name: [
              { required: true, message: '请输入报账姓名', trigger: 'blur' }
            ],
            payFee: [
              { required: true, message: '请输入支出金额', trigger: 'blur' },
              { type: 'number', message: '请确认您输入的支出金额格式是否正确' }
            ],
            payInstis: [
              { required: true, message: '请输入支出机构', trigger: 'blur' }
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
          incFee: '',
          incDetail: '',
          attInfoCDTOS: []
        },
        rules: {
          payFee: [
            { required: true, message: '请输入报账费用', trigger: 'blur' },
            { type: 'number', message: '请确认您输入的报账格式是否正确' }
          ]
        }
      },
      detailDialog: {
        detailDialogVisible: false,
        detailFormDate: {
          incFee: '',
          incDetail: '',
          attInfoCDTOS: []
        }
      },
      // 诊断科室
      diagnosticDepartment: [],
      primaryKey: 'reimId',
      res: {},
      selectForm: {
        hserCertno: '',
        hserName: ''
      }
    }
  },
  methods: {
    // 搜索按钮
    selectBtn (item) {
      if (item) {
        this.selectForm.hserCertno = item.selectFormInput[1].vModel
        this.selectForm.hserName = item.selectFormInput[0].vModel
      }
      if (this.selectForm.hserCertno === undefined || this.selectForm.hserName === undefined) {
        return this.$message({
          type: 'error',
          message: '请输入户主姓名和身份证后查询！'
        })
      }
      this.$http.post(`${this.$http.defaults.baseURL}/pay/selectPayDetailInfoCDTO?hserCertno=${this.selectForm.hserCertno}&hserName=${this.selectForm.hserName}`
      ).then((res) => {
        console.log(res)
        if (item) {
          if (res.data.type === 'error') {
            this.$message({
              message: res.data.message
            })
            this.tableData = []
            return
          }
        }
        this.tableData = res.data.data
        this.res = res.data.data
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
          this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/getOneByHserCertno?hserCertno=${this.addDialog.selectForm.selectFormDate.hserCertno}`).then((res) => {
            console.log(res)
            this.res = res.data.data
            this.addDialog.selectForm.selectFormDate.hserName = res.data.data.hserName
            this.addDialog.selectForm.selectFormDate.fmPop = res.data.data.fmPop
            this.addDialog.selectForm.selectFormDate.fmacctBalc = res.data.data.fmacctBalc
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
      let payDetailInfoCDTO = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addDialog.infoForm.infoFormDate)
          this.$refs.addUpload.submit()
          payDetailInfoCDTO = this.addDialog.infoForm.infoFormDate
          console.log('this.res', this.res)
          payDetailInfoCDTO.fmId = this.res.fmId
          if (payDetailInfoCDTO.fmId === undefined) {
            return this.$message({
              type: 'error',
              message: '请先查询您要添加的用户信息'
            })
          }
          this.$http.post(`${this.$http.defaults.baseURL}/pay/addPayDetailInfoC?certno=${payDetailInfoCDTO.certno}&name=${payDetailInfoCDTO.name}`, payDetailInfoCDTO
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
              this.selectBtn()
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
    // 修改
    editDialogSubmit (formName) {
      let incDetailInfoCDTO = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.addUpload.submit()
          incDetailInfoCDTO = this.editDialog.editFormDate
          incDetailInfoCDTO.fmId = this.res.fmId
          this.$http.post(`${this.$http.defaults.baseURL}/pay/updatePayDetailInfoC`, incDetailInfoCDTO
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
        this.$http.post(`${this.$http.defaults.baseURL}/pay/deletePayDetailInfoCById?payId=${row.payId}`, { incId: row.incId, incFee: row.incFee }
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
      this.addDialog.infoForm.infoFormDate.attInfoCDTOS.push(files.data)
      this.editDialog.editFormDate.attInfoCDTOS.push(files.data)
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
      this.addDialog.infoForm.infoFormDate.attInfoCDTOS.splice(this.addDialog.infoForm.infoFormDate.attInfoCDTOS.indexOf(file), 1)
      this.editDialog.editFormDate.attInfoCDTOS.splice(this.editDialog.editFormDate.attInfoCDTOS.indexOf(file), 1)
    }
  },
  mounted () {
    // dialog显示
    this.$bus.$on('showDialog', () => {
      this.addDialog.addDialogVisible = true
    })
    this.$bus.$on('showEditDialog', (row) => {
      console.log('row', row)
      this.editDialog.editFormDate = row
      this.editDialog.editDialogVisible = true
    })
    this.$bus.$on('showDetailDialog', (row) => {
      this.detailDialog.detailFormDate = row
      this.detailDialog.detailDialogVisible = true
    })
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
