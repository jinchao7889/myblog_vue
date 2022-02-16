<template>
    <div class='footer'>
        <el-link href="https://twitter.com/" type="success">Twitter</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link href="https://youtube.com" type="success">Youtube</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link href="https://space.bilibili.com/307417764" type="success">BiliBili</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link href="/backstagelogin" type="info">Root</el-link>
        <br/>
        <br/>
        <span class="copyright">版权所有 @Kim</span>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data () {
            return {
                drawer: false,
                direction: 'btt'
            }
        },
        methods: {

        }
    }
</script>


<style scoped>
    .footer{
        height: 100px;
        text-align: center;
        font-size: 16px;
        padding: 30px 50px;
        position: relative;
    }
    .copyright{
        font-size: 12px;
    }
</style>


