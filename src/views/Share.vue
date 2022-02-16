<template>
    <div>
        <Header></Header>
        <div>分享</div>
        <el-empty description="努力开发中..."></el-empty>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "Share",
        components: {Footer, Header}
    }
</script>

<style scoped>

</style>