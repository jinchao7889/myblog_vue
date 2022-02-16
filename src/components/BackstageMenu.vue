<template>
    <div>

            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"

                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"

                    active-text-color="#ffd04b">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-home"></i>
                        <span>主页</span>
                    </template>
                    <el-menu-item index="1-1">轮播图</el-menu-item>
                    <el-menu-item index="1-2">综合信息</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span>博客</span>
                    </template>
                    <el-menu-item index="2-1">发表博客</el-menu-item>
                    <el-menu-item index="2-2">管理博客</el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-promotion"></i>
                        <span>生活</span>
                    </template>
                    <el-menu-item index="3-1">发表内容</el-menu-item>
                    <el-menu-item index="3-2">管理内容</el-menu-item>
                    <el-menu-item index="3-3">管理音乐</el-menu-item>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-share"></i>
                        <span>分享</span>
                    </template>
                    <el-menu-item index="4-1">上传</el-menu-item>
                    <el-menu-item index="4-2">管理</el-menu-item>
                </el-submenu>

                <el-menu-item index="5">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                </el-menu-item>

                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item index="6-1">友链设置</el-menu-item>
                    <el-menu-item index="6-2">进入设置</el-menu-item>
                </el-submenu>




            </el-menu>
    </div>
</template>

<script>
    export default {
        name: "BackstageMenu",
        methods: {
            handleSelect(key, keyPath) {
                this.$emit("itemsChanged",key);
                //console.log(key,keyPath)
            }
        }
    }
</script>

<style scoped>

</style>