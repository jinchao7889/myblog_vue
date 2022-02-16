<template>
    <div>
        <el-table
                :data="Article"
                style="width: 100%">

            <el-table-column
                    label="封面">
                <template slot-scope="scope">
                    <el-avatar shape="square" :size="50" :src="scope.row.coverAddress"></el-avatar>   <!--未解决的问题，如何显示用户头像-->
                </template>
            </el-table-column>


            <el-table-column
                    label="标题"
                    property ="articleTitle"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    label="地址"
                    prop="address"
                    show-overflow-tooltip>
            </el-table-column>


            <el-table-column
                    label="创建时间"
                    prop="createDate"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="mpage"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "ArticleManage",
        data() {
            return {
                Article: [],

                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({
                    path:'/articlereedit',
                    query:{
                        articleId:row.articleId
                    }
                })
            },
            handleDelete(index, row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get("/article/del/"+row.articleId).then(res =>{
                        this.page(this.currentPage)
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

            page(currentPage) {
                this.$axios.get("/article/articleslist?currentPage=" + currentPage).then(res => {
                    console.log(res)
                    this.Article = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.total = res.data.data.total
                    this.pageSize = res.data.data.size
                })
            }
        },

        created() {
            this.page(1)
        }

    }
</script>

<style scoped>
    .mpage {
        margin-top: 40px;
        text-align: center;
    }
</style>