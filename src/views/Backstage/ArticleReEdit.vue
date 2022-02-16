<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="标题" prop="articleTitle">
                <el-input v-model="ruleForm.articleTitle"></el-input>
            </el-form-item>

            <el-form-item label="地点" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>

            <el-form-item label="封面" prop="coverAddress">
                <el-input v-model="ruleForm.coverAddress"></el-input>
            </el-form-item>

            <el-upload
                    action="http://localhost:8081/article/pic/upload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handlePicSuccess">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>


            <el-form-item label="内容" prop="articleContent">
                <mavon-editor ref=md @imgAdd="$imgAdd" v-model="ruleForm.articleContent"></mavon-editor>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
                <el-button @click="resetForm">放弃</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: "ArticleReEdit",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false ,

                ruleForm: {
                    articleId:'',
                    articleTitle: '',
                    coverAddress: '',
                    articleContent: '',
                    address: ''
                },
                rules: {
                    articleTitle: [
                        {required: true, message: '请输入文章标题', trigger: 'blur'},
                        {min: 3, max: 150, message: '长度在 3 到 150 个字符', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入文章发生地址', trigger: 'change'}
                    ],
                    coverAddress: [
                        {required: true, message: '请上传有效文章封面图地址', trigger: 'change'}
                    ],
                    articleContent: [
                        {required: true, message: '请输入文章内容', trigger: 'change'}
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
                    url: '/article/pic/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then( res => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    var PicUrl = res.data.data.url;
                    this.$refs.md.$img2Url(pos,PicUrl);
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handlePicSuccess(response, file, fileList){
                console.log(response.data.url)
                this.ruleForm.coverAddress = response.data.url;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/article/edit',this.ruleForm,).then(res => {
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

            resetForm() {
                this.$router.go(-1)
            }
        },

        created() {
            const articleId = this.$route.query.articleId
            if (articleId){
                this.$axios.get('/article/'+articleId).then(res=>{
                    const article = res.data.data
                    console.log(article)
                    this.ruleForm.articleId = article.articleId
                    this.ruleForm.articleTitle = article.articleTitle
                    this.ruleForm.address = article.address
                    this.ruleForm.articleContent = article.articleContent
                })
            }
        }
    }
</script>

<style scoped>

</style>