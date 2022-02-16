<template>
    <div>
        <Header></Header>
        <el-container class="login_content">
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-input type="password" v-model="ruleForm.userPassword"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="GoRegister">注册</el-button>
                    </el-form-item>

                </el-form>
            </el-main>
        </el-container>
        <Footer></Footer>
    </div>

</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";

    export default {
        name: "Login",
        components: {Footer, Header},
        data() {
            return {
                ruleForm: {
                    userName: '',
                    userPassword: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    userPassword: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/login',this.ruleForm).then(res =>{
                           // console.log(res)
                            const jwt = res.headers['authorization']
                            const userInfo = res.data.data

                            //console.log(userInfo)
                            //把数据共享到store中
                            this.$store.commit("SET_TOKEN",jwt)
                            this.$store.commit("SET_USERINFO",userInfo)
                            //测试从store中获取userinfo信息
                            //console.log(this.$store.getters.getUserInfo)
                            this.$router.push("/blogs")

                        })

                    } else {
                        console.log('表单提交失败！');
                        return false;
                    }
                });
            },
            GoRegister() {
                this.$router.push({
                    path: '/register'
                })
            }
        }
    }
</script>

<style scoped>
    .login_content{
        padding-top: 150px;
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