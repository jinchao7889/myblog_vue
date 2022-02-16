<template>
    <div>
        <Header></Header>
        <div class="block">

            <el-timeline>
                <el-timeline-item :timestamp="blog.createDate" placement="top" v-for="blog in blogs"><!--v-if="blogs.logicDel == 1"-->
                    <el-card>
                        <router-link :to="{name: 'Detail',params: {blogId: blog.blogId}}">
                            <h4>{{blog.blogTitle}}</h4>
                        </router-link>
                        <p>{{blog.blogDescription}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>

            <el-pagination class="mpage"
                           background
                           layout="prev, pager, next"
                           :current-page="currentPage"
                           :page-size="pageSize"
                           :total="total"
                           @current-change="page">
            </el-pagination>

        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";

    export default {
        name: "Blogs",
        components: {Footer, Header},
        data() {
            return {
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5
            }
        },
        methods: {
            page(currentPage) {
                this.$axios.get("/blogs/blogslist?currentPage=" + currentPage).then(res => {
                    console.log(res)
                    this.blogs = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.total = res.data.data.total
                    this.pageSize = res.data.data.size
                })
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>