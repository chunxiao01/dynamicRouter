<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
    style="height: 100%; margin-top: 150px"
  >
    <el-col style="width: 500px">
      <el-card class="loginbox">
        <h3 class="loginbox-title">登录</h3>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sessionStorage.setItem("user", this.ruleForm.username)

          //动态添加路由
          const menuList = [
            {
              path: "systeminfo",
              name: "SystemInfo",
              componentUrl: "views/sys/SystemInfo.vue"
            },
            {
              path: "systemconfig",
              name: "SystemConfig",
              componentUrl: "views/sys/SystemConfig.vue"
            }
          ]
          this.$store.dispatch("actionAddMenu", menuList)

          this.$store.state.dynamicMenuList.forEach((item) => {
            this.$router.addRoute("system", {
              path: item.path,
              name: item.name,
              component: () => import(`@/${item.componentUrl}`)
            })
          })
          sessionStorage.setItem("menuList", JSON.stringify(menuList))
          this.$router.push({
            path: "/system/systeminfo"
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.loginbox-title {
  text-align: center;
  margin: 10px 0;
}
.el-form-item__content {
  text-align: center;
}
.el-form-item__content button {
  margin: 0 30px;
}
</style>
