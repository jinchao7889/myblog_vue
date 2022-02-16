<template>
    <div>
        <el-table :data="blogs.filter(data => !search || data.blogTitle.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">

            <el-table-column label="编号" prop="blogId">
            </el-table-column>

            <el-table-column label="标题" prop="blogTitle" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="发表日期" prop="createDate">
            </el-table-column>

            <el-table-column align="right">

                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>

                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
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
        name: "BlogsManage",
        data() {
            return {
                blogs: [],
                search: '',
                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({
                    path:'/blogreedit',
                    query:{
                        blogId:row.blogId
                    }
                })
            },

            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get("/blogs/del/"+row.blogId).then(res =>{
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
                this.$axios.get("/blogs/blogslist?currentPage=" + currentPage).then(res => {
                    console.log(res)
                    this.blogs = res.data.data.records
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