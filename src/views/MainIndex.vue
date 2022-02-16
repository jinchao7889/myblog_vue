<template>
    <div>
        <Header></Header>
        <el-empty description="还没想好主页要放啥..."></el-empty>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "MainIndex",
        components: {Footer, Header}
    }
</script>

<style scoped>

</style>