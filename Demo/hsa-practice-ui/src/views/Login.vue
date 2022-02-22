<template>
  <div class="login">
    <div class="login-box">
      <h3>管理平台</h3>
      <div class="login-box-body">
        <el-form ref="form" :model="form">
          <el-form-item>
            <span slot="label" style="color: #ffffff">账号</span>
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label" style="color: #ffffff">密码</span>
            <el-input
              type="password"
              v-model="form.password"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="login(form.username, form.password)"
            >登录</el-button
          >
        </el-form>
      </div>
      <p style="color: #ffffff">&copy; ArnoKnight</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    login (username, password) {
      // console.log(this.form.username)
      if (username !== 'admin' || password !== '123456') {
        this.$message.error('用户名或密码错误，请重新登录。')
        this.form.username = ''
        this.form.password = ''
        return
      }
      this.$message({
        type: 'success',
        message: '登录成功！'
      })
      this.$router.push('./home')
    },
    login1 (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  background: url(../assets/backgroundImage.jpg);
  background-size: 100% 100%;
}

.login-box {
  width: 350px;
  height: 600px;
  margin: auto;
  /* background-color: pink; */
  text-align: center;
}

.login-box-body {
  height: 310px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px 20px 15px;
  background: rgba(131, 123, 133, 0.5);
}

h3 {
  color: #eb4545;
  margin-bottom: 30px;
}

.input-title {
  color: #ffffff !important;
}

.login-btn {
  width: 310px;
  margin-top: 30px;
  /* float: right; */
}
</style>
