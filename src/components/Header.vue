<template>
    <div class="topbar">
        <el-row>
            <el-col :span="2" class="bg-purple">
                <el-link href="/"><div class="wordstyle">主页</div></el-link>
            </el-col>

            <el-col :span="2" class="bg-purple">
                <el-link href="/blogs"><div class="wordstyle">技术</div></el-link>
            </el-col>

            <el-col :span="2" class="bg-purple">
                <el-link href="/life"><div class="wordstyle">生活</div></el-link>
            </el-col>
            <el-col :span="2" class="bg-purple">
                <el-link href="/share"><div class="wordstyle">分享</div></el-link>
            </el-col>

            <el-col :span="12">
                <div class="grid-content"></div>
            </el-col>

            <el-col :span="2"  class="bg-purple">
                <div class="grid-content ">
                    <div style="display: flex;align-items: center;" v-show="hasLogin">
                        <el-avatar style="margin-right: 10px;" :size="30" :src="users.userAvatar"></el-avatar>
                        {{users.userName}}
                    </div>
                </div>
            </el-col>

            <el-col :span="1" v-show="!hasLogin" class="bg-purple">
                <div class="grid-content" >
                    <el-link href="/login" type="primary">登录</el-link>
                </div>
            </el-col>

            <el-col :span="1" v-show="hasLogin" class="bg-purple">
                <div class="grid-content" >
                    <el-link @click="logout" type="danger">退出</el-link>
                </div>
            </el-col>

        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                users: {
                    userName: 'XXX',
                    userAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                hasLogin: false
            }
        },
        methods: {
            logout() {
                this.$axios.get("/logout", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    this.$store.commit("REMOVE_INFO")
                    this.$router.push("/login")
                })
            }
        },
        created() {
            if (this.$store.getters.getUserInfo.userName) {
                //console.log(this.$store.getters.getUserInfo.userName)
                this.users.userName = this.$store.getters.getUserInfo.userName
                this.users.userAvatar = this.$store.getters.getUserInfo.userAvatar
                this.hasLogin = true
            }
        }
    }
</script>

<style>
    .topbar{

    }
   .wordstyle{
       font-size: large;
       font-weight: bold;
    }
    .el-row {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .el-col {
        border-radius: 4px;
        height: 40px;
        text-align: center;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        /*background: #d3dce6;*/
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        min-height: 50px;
        font-family: sans-serif;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }


</style>