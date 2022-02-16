<template>
    <div>
        <el-container>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="歌曲地址" prop="musicAddress">
                        <el-input v-model="ruleForm.musicAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="歌曲名称" prop="musicName">
                        <el-input  v-model="ruleForm.musicName"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

        <el-table
                :data="music"
                style="width: 100%">
            <el-table-column
                    label="歌曲名称"
                    property ="musicName"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    label="歌曲地址"
                    prop="musicAddress"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>


    </div>
</template>

<script>
    export default {
        name: "MusicManage",
        data() {
            return {
                music: [],

                ruleForm: {
                    musicName: '',
                    musicAddress: ''
                },
                rules: {
                    musicAddress: [
                        {required: true, message: '请输入歌曲地址', trigger: 'blur'},
                        {max: 2048, message: '长度不超过2048个字符', trigger: 'blur'}
                    ],
                    musicName: [
                        {required: true, message: '请输入歌曲名称', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {

            handleDelete(index, row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get("/music/del/"+row.id).then(res =>{
                        this.musiclist();
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },

            musiclist() {
                this.$axios.get("/music/list").then(res => {
                    console.log(res)
                    this.music = res.data.data
                })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/music/add',this.ruleForm).then(res =>{
                            alert("提交成功！")
                            this.musiclist();
                            this.$refs[formName].resetFields();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },

        created() {
            this.musiclist();
        }
    }
</script>

<style scoped>
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