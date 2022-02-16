<template>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="标题" prop="blogTitle">
                    <el-input v-model="ruleForm.blogTitle"></el-input>
                </el-form-item>

                <el-form-item label="摘要" prop="blogDescription">
                    <el-input type="textarea" v-model="ruleForm.blogDescription"></el-input>
                </el-form-item>


                <el-form-item label="内容" prop="blogContent">
                    <mavon-editor ref=md @imgAdd="$imgAdd" v-model="ruleForm.blogContent"></mavon-editor>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
                    <el-button @click="resetForm('ruleForm')">放弃</el-button>
                </el-form-item>
            </el-form>
        </div>
</template>



<script>
    export default {
        name: "BlogReEdit",
        data() {
            return {
                ruleForm: {
                    blogId:'',
                    blogTitle: '',
                    blogDescription: '',
                    blogContent: ''
                },
                rules: {
                    blogTitle: [
                        {required: true, message: '请输入博客标题', trigger: 'blur'},
                        {min: 3, max: 150, message: '长度在 3 到 150 个字符', trigger: 'blur'}
                    ],
                    blogDescription: [
                        {required: true, message: '请输入博客摘要', trigger: 'change'}
                    ],
                    blogContent: [
                        {required: true, message: '请输入内容', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            // 绑定@imgAdd event
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                this.$axios({
                    url: '/blogs/pic/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then( res => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    var PicUrl = res.data.data.url
                    this.$refs.md.$img2Url(pos,PicUrl);
                })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/blogs/edit',this.ruleForm,/*{
                           headers: {
                                "Authorization":localStorage.getItem("token")
                            }
                        }*/).then(res => {
                            console.log(res)

                            this.$alert('更新成功！', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.go(-1)
                                }
                            });

                        })
                    } else {
                        console.log('更新失败!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$router.go(-1)
            }
        },

        created() {
            const blogId = this.$route.query.blogId
            if (blogId){
                this.$axios.get('/blogs/'+blogId).then(res=>{
                    const blog = res.data.data
                    console.log(blog)
                    this.ruleForm.blogId = blog.blogId
                    this.ruleForm.blogTitle = blog.blogTitle
                    this.ruleForm.blogDescription = blog.blogDescription
                    this.ruleForm.blogContent = blog.blogContent
                })
            }
        }
    }
</script>

<style scoped>


</style>