<template>
    <div>
        <Header></Header>

        <FlipClock></FlipClock>

        <el-divider><i class="el-icon-map-location"></i></el-divider>

        <div class="lifeCard" v-for="article in articles" >
            <el-container>
                <el-header>
                    <router-link :to="{name: 'ArticleDetail',params: {articleId: article.articleId}}">
                        {{article.articleTitle}}
                    </router-link>
                </el-header>
                <el-container>
                    <el-aside style="width: 300px;padding: 90px 0;font-size: 20px">
                        <p>{{article.createDate}}</p>
                        <p><i class="el-icon-map-location"></i>  {{article.address}}</p>
                    </el-aside>

                    <el-main>
                        <el-image
                                style="width: 100%; height: 300px; display: block;"
                                :src="article.coverAddress"
                                fit="cover"></el-image>
                    </el-main>
                </el-container>
            </el-container>
        </div>


        <el-pagination class="mpage"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change="page">
        </el-pagination>



        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import FlipClock from "../components/FlipClock";
    import Footer from "../components/Footer";
    export default {
        name: "Life",
        components: {Footer, FlipClock, Header},
        data() {
            return {
                articles: {},
                currentPage: 1,
                total: 0,
                pageSize: 10
            }
        },
        methods: {
            page(currentPage) {
                this.$axios.get("/article/articleslist?currentPage=" + currentPage).then(res => {
                    console.log(res)
                    this.articles = res.data.data.records
                    this.currentPage = res.data.data.current
                    this.total = res.data.data.total
                    this.pageSize = res.data.data.size
                })
            }
        },
        created() {
            console.log(this.$store.getters.getUserInfo)
            if (!this.$store.getters.getUserInfo){
                this.$router.push({path: '/login'})
            }else {
                this.page(1)
            }
        }
    }

</script>


<style scoped>
    .lifeCard{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
    }
    .el-header, .el-footer {
        background-color: #ffffff;
        text-align: center;
        font-size: 30px;
        line-height: 60px;
    }

    .el-aside {
        background-color: #ffffff;
        text-align: center;
    }

    .el-main {
        background-color: #ffffff;
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

    .mpage {
        margin: 0 auto;
        text-align: center;
    }

</style>