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
        <h4 class="dialog-title">新增家庭成员信息</h4>
      </template>
      <el-form
        class="info-form"
        :model="addDialog.infoForm.infoFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="addInfoRuleForm"
      >
        <el-form-item label="姓名" label-width="110px" prop="psnName">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.psnName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="110px" prop="certno">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.certno"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="110px" prop="gend">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.gend"
            placeholder="请选择"
          >
            <el-option
              v-for="item in addDialog.infoForm.gendOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="110px" prop="age">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.age"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" label-width="110px" prop="naty">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.naty"
            placeholder="请选择"
          >
            <el-option
              v-for="item in nation"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" label-width="110px" prop="mob">
          <el-input
            v-model="addDialog.infoForm.infoFormDate.mob"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="与户主关系" label-width="110px" prop="rlts">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.rlts"
            placeholder="请选择"
          >
            <el-option
              v-for="item in familyRelations"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家地区" label-width="110px" prop="natRegnCode">
          <el-select
            v-model="addDialog.infoForm.infoFormDate.natRegnCode"
            placeholder="请选择"
          >
            <el-option
              v-for="item in countryCode"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
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
        <h4 class="dialog-title">家庭成员信息修改</h4>
      </template>
      <el-form
        class="info-form"
        :model="editDialog.editFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="editInfoRuleForm"
      >
        <el-form-item label="姓名" label-width="110px" prop="psnName">
          <el-input
            v-model="editDialog.editFormDate.psnName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="110px" prop="certno">
          <el-input
            v-model="editDialog.editFormDate.certno"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="110px" prop="gend">
          <el-select
            v-model="editDialog.editFormDate.gend"
            placeholder="请选择"
          >
            <el-option
              v-for="item in addDialog.infoForm.gendOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="110px" prop="age">
          <el-input
            v-model="editDialog.editFormDate.age"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" label-width="110px" prop="naty">
          <el-select
            v-model="editDialog.editFormDate.naty"
            placeholder="请选择"
          >
            <el-option
              v-for="item in nation"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" label-width="110px" prop="mob">
          <el-input
            v-model="editDialog.editFormDate.mob"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="与户主关系" label-width="110px" prop="rlts">
          <el-select
            v-model="editDialog.editFormDate.rlts"
            placeholder="请选择"
          >
            <el-option
              v-for="item in familyRelations"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家地区" label-width="110px" prop="natRegnCode">
          <el-select
            v-model="editDialog.editFormDate.natRegnCode"
            placeholder="请选择"
          >
            <el-option
              v-for="item in countryCode"
              :key="item.natDicValCode"
              :label="item.natDicValName"
              :value="item.natDicValCode"
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
        <h4 class="dialog-title">家庭成员详情</h4>
      </template>
      <el-form
        class="edit-form"
        :model="detailDialog.detailFormDate"
        label-width="80px"
        :rules="addDialog.infoForm.rules"
        ref="addInfoRuleForm"
      >
        <el-form-item label="姓名" label-width="110px" prop="psnName">
          <el-input
            v-model="detailDialog.detailFormDate.psnName"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="110px" prop="certno">
          <el-input
            v-model="detailDialog.detailFormDate.certno"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="110px" prop="gend">
          <el-input
            v-model="detailDialog.detailFormDate.gend"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="110px" prop="age">
          <el-input
            v-model="detailDialog.detailFormDate.age"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" label-width="110px" prop="naty">
          <el-input
            v-model="detailDialog.detailFormDate.naty"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" label-width="110px" prop="mob">
          <el-input
            v-model="detailDialog.detailFormDate.mob"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="与户主关系" label-width="110px" prop="rlts">
          <el-input
            v-model="detailDialog.detailFormDate.rltsText"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="国家地区" label-width="110px" prop="natRegnCode">
          <el-input
            v-model="detailDialog.detailFormDate.natRegnCode"
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
          targetTableProp: 'psnName',
          targetTableLabel: '姓名'
        }, {
          targetTableWidth: '240',
          targetTableProp: 'certno',
          targetTableLabel: '身份证'
        }, {
          targetTableWidth: '',
          targetTableProp: 'gendText',
          targetTableLabel: '性别'
        }, {
          targetTableWidth: '',
          targetTableProp: 'age',
          targetTableLabel: '年龄'
        }, {
          targetTableWidth: '',
          targetTableProp: 'mob',
          targetTableLabel: '电话号码'
        }, {
          targetTableWidth: '',
          targetTableProp: 'rltsText',
          targetTableLabel: '与户主关系'
        }, {
          targetTableWidth: '',
          targetTableProp: 'chkStatsText',
          targetTableLabel: '审核状态'
        }
      ],
      titleBodyName: '家庭成员信息',
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
      // 控制addDialog显示隐藏
      addDialog: {
        addDialogVisible: false,
        infoForm: {
          infoFormDate: {
            psnName: '',
            certno: '',
            gend: '',
            age: '',
            naty: '',
            mob: '',
            rlts: '',
            natRegnCode: '',
            memo: '',
            fmId: '',
            attInfoCDTOS: []
          },
          rules: {
            psnName: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            certno: [
              { required: true, message: '请输入身份证', trigger: 'blur' },
              { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '请输入正确的身份证', trigger: 'blur' }
            ],
            gend: [
              { required: true, message: '请输入性别', trigger: 'change' }
            ],
            age: [
              { required: true, message: '请输入年龄', trigger: 'blur' }
            ],
            naty: [
              { required: true, message: '请选择民族', trigger: 'change' }
            ],
            mob: [
              { required: true, message: '请输入电话号码', trigger: 'change' },
              { pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message: '请输入正确的电话号码', trigger: 'blur' }
            ],
            rlts: [
              { required: true, message: '请选择与户主关系', trigger: 'change' }
            ],
            natRegnCode: [
              { required: true, message: '请选择国家地区', trigger: 'change' }
            ]
          },
          gendOption: [{
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          }, {
            value: '0',
            label: '未知'
          }]
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
      // 关系
      familyRelations: [],
      // 民族
      nation: [],
      // 国家代码
      countryCode: [],
      // 搜索信息
      searchInfo: {
        certno: '',
        psnName: '',
        chkStats: ''
      },
      fmId: ''
    }
  },
  methods: {
    // 搜索按钮
    selectBtn (item) {
      // console.log(item)
      if (item) {
        this.searchInfo.certno = item.selectFormInput[1].vModel
        this.searchInfo.psnName = item.selectFormInput[0].vModel
        this.searchInfo.chkStats = item.selectFormSelect.vModel
      }
      this.$http.get(`http://172.16.65.105:8888/hsa-practice/fmMemInfoC/selectFmmemall?certno=${this.searchInfo.certno}&chkStats=${this.searchInfo.chkStats}&psnName=${this.searchInfo.psnName}`
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
        res.data.data.forEach((item, index) => {
          if (item.chkStats === '0') {
            item.chkStatsText = '未审核'
          }
          if (item.chkStats === '1') {
            item.chkStatsText = '审核通过'
          }
          if (item.chkStats === '2') {
            item.chkStatsText = '审核未通过'
          }
          if (item.rlts === '1') {
            item.rltsText = '本人或户主'
          }
          if (item.rlts === '2') {
            item.rltsText = '配偶'
          }
          if (item.rlts === '3') {
            item.rltsText = '子女'
          }
          if (item.rlts === '4') {
            item.rltsText = '孙子孙女或外孙子外孙女'
          }
          if (item.rlts === '5') {
            item.rltsText = '父母'
          }
          if (item.rlts === '6') {
            item.rltsText = '祖父母或外祖父母'
          }
          if (item.rlts === '7') {
            item.rltsText = '兄弟姐妹'
          }
          if (item.rlts === '8') {
            item.rltsText = '其他亲属'
          }
          if (item.rlts === '9') {
            item.rltsText = '非亲属'
          }
          if (item.gend === '0') {
            item.gendText = '未知'
          }
          if (item.gend === '1') {
            item.gendText = '男'
          }
          if (item.gend === '2') {
            item.gendText = '女'
          }
        })
        this.tableData = res.data.data
        this.fmId = res.data.data[0].fmId
        console.log('this.tableData', this.tableData)
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
      let fmMemInfoCDTO = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.addUpload.submit()
          fmMemInfoCDTO = this.addDialog.infoForm.infoFormDate
          if (!this.fmId) {
            return this.$message({
              type: 'error',
              message: '先查询您要添加的家庭后再试！'
            })
          }
          fmMemInfoCDTO.fmId = this.fmId
          console.log(this.fmId)
          this.$http.post('http://172.16.65.105:8888/hsa-practice/fmMemInfoC/addFmmem', fmMemInfoCDTO
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
    // 获取家庭关系
    getFamilyRelations () {
      this.$http.get(`${this.$http.defaults.baseURL}/web/practice/sample/queryDicList/RLTS`
      ).then((res) => {
        this.familyRelations = res.data.data.data
        console.log(this.familyRelations)
      })
    },
    // 获取民族字典
    getNation () {
      this.$http.get(`${this.$http.defaults.baseURL}/web/practice/sample/queryDicList/NATY`
      ).then((res) => {
        this.nation = res.data.data.data
        console.log(this.nation)
      })
    },
    // 获取国家地区代码
    getCountryCode () {
      this.$http.get(`${this.$http.defaults.baseURL}/web/practice/sample/queryDicList/NAT_REGN_CODE`
      ).then((res) => {
        this.countryCode = res.data.data.data
        console.log(this.countryCode)
      })
    },
    // 修改
    editDialogSubmit (formName) {
      let fmBasInfoCDTO = {}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fmBasInfoCDTO = this.editDialog.editFormDate
          this.$http.post('http://172.16.65.105:8888/hsa-practice/fmMemInfoC/updateFmmem', fmBasInfoCDTO
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
        this.$http.post(`http://172.16.65.105:8888/hsa-practice/fmMemInfoC/deleteFmmem?fmMemId=${row.fmMenId}`
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
      console.log(this.editDialog.editFormDate)
      this.editDialog.editDialogVisible = true
    })
    this.$bus.$on('showDetailDialog', (row) => {
      this.detailDialog.detailFormDate = row
      this.detailDialog.detailDialogVisible = true
    })
    this.getFamilyRelations()
    this.getNation()
    this.getCountryCode()
    this.$bus.$on('deleteBtn', (row) => {
      this.deleteBtn(row)
    })
  },
  beforeDestroy () {
    this.$bus.$off('showDialog')
    this.$bus.$off('showEditDialog')
    this.$bus.$off('showDetailDialog')
    this.$bus.$off('deleteBtn')
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
