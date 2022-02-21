<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <template slot="title">
      <h4 class="dialog-title">
        {{
          controlDialog.dialogSelectForm
            ? controlDialog.dialogSelectForm.title
            : controlDialog.dialogInfoForm.title
        }}
      </h4>
    </template>
    <el-form
      class="select-form"
      :model="form"
      label-width="80px"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item
        label="户主身份证"
        label-width="110px"
        required
        prop="name"
        ref="ruleForm"
      >
        <el-input
          v-model="form.name"
          @change="enterInput('ruleForm')"
        ></el-input>
      </el-form-item>
      <el-form-item label="户主姓名" label-width="110px" required>
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别" label-width="110px" required>
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="110px" required>
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="国家地区代码" label-width="110px">
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="民族" label-width="110px" required>
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="controlDialog.dialogSelectForm">
      <h4 class="dialog-title">{{ controlDialog.dialogInfoForm.title }}</h4>
      <el-form
        class="info-form"
        :model="form"
        label-width="80px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          label="户主身份证"
          label-width="110px"
          required
          prop="name"
          ref="ruleForm"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="110px" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="110px" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="110px" required>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" label-width="110px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="国家地区代码" label-width="110px">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" label-width="110px">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="与户主关系" label-width="110px" required>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="textarea-item" label="备注" label-width="110px">
          <el-input type="textarea" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="附件"
          label-width="110px"
          style="width: 100%; height: 100%"
        >
          <el-upload
            class="upload-demo"
            action="https://localhost:8080/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" @click="uploadAttachments"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialogVisible: false,
      // 选择框
      options: [{
        value: '选项1',
        label: '男'
      }, {
        value: '选项2',
        label: '女'
      }, {
        value: '选项3',
        label: '未知'
      }],
      // 选择框默认为空
      value: '',
      // 校验规则
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // 文件列表
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    // 关闭dialog
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 搜索
    enterInput (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 删除文件
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadAttachments () {
      console.log(this.fileList)
    }
  },
  mounted () {
    // dialog显示
    this.$bus.$on('showDialog', () => {
      this.dialogVisible = true
    })
  }
}
</script>

<style scoped>
.dialog-title {
  font-size: 20px;
  border-left: 13px solid #1b65b8;
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
.info-form {
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
</style>
