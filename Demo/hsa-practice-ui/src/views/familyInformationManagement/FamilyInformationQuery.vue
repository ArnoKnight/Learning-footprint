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
            action="http://172.16.65.127:8888/hsa-practice/practice/familyinfo/attinfo/insertAtt"
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
      primaryKey: 'fmId',
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
      }
      this.$http.post(`${this.$http.defaults.baseURL}/fmBasInfo/getCheckedFmBasInfo?hserCertno=${this.searchInfo.hserCertno}&hserName=${this.searchInfo.hserName}`
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
          if (item.chkStas === '1') {
            item.chkStasText = '审核通过'
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
