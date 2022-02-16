<template>
    <div>
        <el-container class="login_content">
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="管理员" prop="managerName">
                        <el-input v-model="ruleForm.managerName"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="managerPassword">
                        <el-input type="password" v-model="ruleForm.managerPassword"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "BackstageLogin",
        data() {
            return {
                ruleForm: {
                    managerName: '',
                    managerPassword: ''
                },
                rules: {
                    managerName: [
                        {required: true, message: '请输入管理员账号', trigger: 'blur'},
                        {min: 3, max: 18, message: '长度在 3 到 18字符', trigger: 'blur'}
                    ],
                    managerPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*this.$axios.post('/login',this.ruleForm).then(res =>{
                            // console.log(res)
                            const jwt = res.headers['authorization']
                            const userInfo = res.data.data

                            //console.log(userInfo)
                            //把数据共享到store中
                            this.$store.commit("SET_USERINFO",userInfo)
                            //测试从store中获取userinfo信息
                            //console.log(this.$store.getters.getUserInfo)
                            this.$router.push("/blogs")
                        })*/
                        this.$axios.post('/managerlogin',this.ruleForm).then(res =>{
                            //将传回的res中的管理员信息存到store中
                            const managerInfo = res.data.data
                            this.$store.commit("SET_MANAGERINFO",managerInfo)
                            this.$router.push("/backstagemanage")
                        })




                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login_content{
        padding-top: 200px;
        padding-bottom: 150px;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }


    .demo-ruleForm{
        max-width: 500px;
        margin: 0 auto;
    }
</style>