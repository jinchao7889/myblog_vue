<template>
    <div >
        <Header></Header>

        <el-main>
            <div>
                <div style="text-align: center;">
                    <h1>{{blog.title}}</h1>
                    <span class="createDate">{{blog.createDate}}</span>
                </div>
                <el-divider></el-divider>
                <div class="markdown-body" v-html="blog.content"></div>
            </div>
        </el-main>
        <Footer></Footer>



    </div>
</template>

<script>
    import Header from "../components/Header";
    import 'github-markdown-css/github-markdown.css'
    import Footer from "../components/Footer";
    export default {
        name: "Detail",
        components: {Footer, Header},
        data(){
            return {
                blog:{
                    id:'',
                    title: '标题',
                    content: '正文内容',
                    createDate:''
                },
                IsOwnBlog:false
            }
        },
        methods: {

        },

        created() {
            const blogId = this.$route.params.blogId
            console.log(blogId)
            if (blogId){
                this.$axios.get('/blogs/'+blogId).then(res=>{
                    console.log(res)

                    const blog = res.data.data

                    this.blog.id = blog.blogId
                    this.blog.title = blog.blogTitle
                    this.blog.createDate = blog.createDate

                    var MarkdownIt = require("markdown-it")
                    var md = new MarkdownIt()
                    var result = md.render(blog.blogContent)

                    this.blog.content = result

                    //this.IsOwnBlog = (blog.userId === this.$store.getters.getUserInfo.id)//判断编辑的按钮是否是本人操作，如果是本人，则显示，他人则隐藏
                })
            }
        }
    }
</script>

<style scoped>
.whole_page{
    min-height: 1000px;
}
.el-aside {
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.el-main {
    min-height: 1000px;
    background-color: #FEFAF6;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1)
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
    .createDate{
        text-align:right;
    }
</style>