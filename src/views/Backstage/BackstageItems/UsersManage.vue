<template>
    <div>
        <el-table
                :data="Users"
                style="width: 100%">

            <el-table-column
                    label="头像">
                <template slot-scope="scope">
                    <el-avatar :src="scope.row.userAvatar"></el-avatar>   <!--未解决的问题，如何显示用户头像-->
                </template>

            </el-table-column>


            <el-table-column
                    label="用户名"
                    property ="userName"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    label="邮箱"
                    prop="userMail"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                    label="等级"
                    prop="userRole">
            </el-table-column>

            <el-table-column
                    label="状态"
                    prop="status">
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
                            @click="handleEdit(scope.$index, scope.row)">管理</el-button>
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
        name: "UsersManage",
        data() {
            return {
                Users: [],

                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        },
        methods: {
            handleEdit(index, row) {

                console.log(row.userAvatar);
            },

            page(currentPage) {
                this.$axios.get("/users/userslist?currentPage=" + currentPage).then(res => {
                    console.log(res)
                    this.Users = res.data.data.records
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