<template>
    <div>
        <Header></Header>

        <el-main>
            <div>
                <h1>{{article.title}}</h1>
                <span class="createDate">{{article.createDate}}  <i class="el-icon-map-location"></i> {{article.address}}</span>
                <el-divider></el-divider>
                <div class="markdown-body" v-html="article.content"></div>
            </div>
        </el-main>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "ArticleDetail",
        components: {Header,Footer},
        data(){
            return {
                article:{
                    id:'',
                    title: '标题',
                    content: '正文内容',
                    createDate:'',
                    address:'日本'
                }
            }
        },
        methods: {

        },
        created() {
            console.log(this.$route.params.articleId)
            const articleId = this.$route.params.articleId
            if (articleId){
                this.$axios.get('/article/' + articleId).then(res => {
                    console.log(res)

                    const article = res.data.data

                    this.article.id = article.articleId
                    this.article.title = article.articleTitle
                    this.article.createDate = article.createDate
                    this.article.address = article.address

                    const MarkdownIt = require("markdown-it")
                    const md = new MarkdownIt()
                    const result = md.render(article.articleContent)

                    this.article.content = result


                })
            }
        }
    }
</script>

<style scoped>
    .el-main {
        min-height: 1000px;
    }
</style>