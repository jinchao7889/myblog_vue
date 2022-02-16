<template>
    <div>
        子组件（菜单列表）A
        <header>
            <h1 @click="changeTitle">{{title}}</h1>
        </header>
    </div>
</template>

<script>
    export default {
        name: "SonA",
        data() {
            return {
                title:"我是son组件A，点击我传递给你我的值",
                number:"来自子组件的信息：2222"
            }
        },
        methods:{
            changeTitle() {
                this.$emit("titleChanged",this.number);
            }
        }
    }
</script>

<style scoped>

</style>