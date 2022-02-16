<template>

    <div>
        <br/>
            <el-row :gutter="20">
                <el-col :span="4">
                    <div>
                        <el-link href="/" type="success" icon="el-icon-back">返回</el-link>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content">
                        后台管理
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <el-avatar> 管 </el-avatar>管理员
                    </div>
                </el-col>
            </el-row>

        <el-container>
            <el-container>

                <el-aside width="220px">
                    <BackstageMenu v-on:itemsChanged="updateItems"></BackstageMenu>
                </el-aside>

                <el-main>
                    <div class="CurrentItem">
                        <Carousel v-show="currentItem=='1-1'"></Carousel>
                        <GeneralInfo v-show="currentItem=='1-2'"></GeneralInfo>

                        <BlogEdit v-show="currentItem=='2-1'"></BlogEdit>
                        <BlogsManage v-show="currentItem=='2-2'"></BlogsManage>

                        <ArticleEdit v-show="currentItem=='3-1'"></ArticleEdit>
                        <ArticleManage v-show="currentItem=='3-2'"></ArticleManage>
                        <MusicManage v-show="currentItem=='3-3'"></MusicManage>



                        <UsersManage v-show="currentItem==5"></UsersManage>
                        <LinkSetting v-show="currentItem=='6-1'"></LinkSetting>

                        <div>当前items:{{currentItem}}</div>
                    </div>
                </el-main>

            </el-container>
        </el-container>
    </div>

</template>

<script>
    import BackstageMenu from "../../components/BackstageMenu";
    import BlogEdit from "./BackstageItems/BlogEdit";
    import Carousel from "./BackstageItems/Carousel";
    import BlogsManage from "./BackstageItems/BlogsManage";
    import GeneralInfo from "./BackstageItems/GeneralInfo";
    import MusicManage from "./BackstageItems/MusicManage";
    import UsersManage from "./BackstageItems/UsersManage";
    import LinkSetting from "./BackstageItems/LinkSetting";
    import ArticleManage from "./BackstageItems/ArticleManage";
    import ArticleEdit from "./BackstageItems/ArticleEdit";

    export default {
        components: {
            ArticleEdit,
            ArticleManage,
            LinkSetting,
            UsersManage,
            MusicManage,
            GeneralInfo,
            BlogsManage,
            Carousel,
            BlogEdit,
            BackstageMenu
        },
        data() {
            return {
                currentItem:'1-1'
            }
        },
        methods:{
            updateItems(e){
                this.currentItem=e
            }

        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        text-align: center;
        font-size: 30px;
        /*line-height: 60px;*/
    }

    .el-aside {
        background-color: #545c64;
        line-height: 500px;
    }

    .el-main {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-row {
        background-color: #ffffff;
        margin-bottom: 10px;
        height: 80px;
        padding: 30px 0;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }


    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        font-size: 30px;

    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .CurrentItem{
        margin-top: 50px;
    }
</style>