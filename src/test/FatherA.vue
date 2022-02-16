<template>
    <div>
        <SonA v-on:titleChanged="updateTitle"></SonA>
        <h2>{{title}}</h2>
    </div>
</template>

<script>
    import SonA from "./SonA";
    export default {
        name: "FatherA",
        components: {SonA},
        data(){
            return{
                title:""
            }
        },
        methods:{
            updateTitle(e){   //声明这个函数
                this.title = e;
            }
        },
    }
</script>

<style scoped>

</style>