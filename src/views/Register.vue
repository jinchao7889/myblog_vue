<template>
    <div>
        <Header></Header>


        <el-container class="register_content">
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="userMail">
                        <el-input v-model="ruleForm.userMail"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
        name: "Register",
        components: {Footer, Header},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.userPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    userName: '',
                    userPassword: '',
                    checkPass: '',
                    userMail: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    userPassword: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ],
                    userMail: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/users/register',this.ruleForm).then(res =>{
                            console.log(res)
                        })
                    } else {
                        console.log('注册失败！');
                        return false;
                    }
                });
            }
        }

    }
</script>

<style scoped>
    .register_content {
        padding-top: 150px;
        padding-bottom: 150px;
    }

    .demo-ruleForm {
        max-width: 500px;
        margin: 0 auto;
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


</style>