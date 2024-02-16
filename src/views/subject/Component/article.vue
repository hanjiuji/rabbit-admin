<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { getArticle } from "@/api/article";
import { useAdminStore } from "@/stores";
import { useRouter } from 'vue-router'

defineOptions({
  name: 'articleI'
})
const props = defineProps({
  trem: {
    type: Number,
    defualt: 2
  }
})
// 判断是不是登录状态
const AdminStore = useAdminStore();
// console.log(AdminStore.token == '' ? 1:2);

// 默认的分页数据
type ArticleDto = {
  page: Number,
  size: Number,
  term: String,
  termId: Number
}
// 获取文章的参数
const getArticleDto = ref<ArticleDto>({
  page: 1,
  size: 2,
  term: '音乐',
  termId: props.trem!
})
type article = {
  adminId: Number,
  articleCategoryId: Number
  content: String
  createTime: String
  id: Number
  img: String
  labelId: Number
  subheading: String
  title: String
  updateTime: String
}
//渲染文章数据
const articleList = ref<[] | article[]>([])
// 页面number
const pageNumber = ref<Number>(100)
// 获取文章分类
const defArticle = async () => {
  if (!AdminStore.token) {
    return
  }
  const res = await getArticle(getArticleDto.value)
  console.log(res)
  if (res.data) {
    articleList.value = res.data.data
    let size = (res.data.total / Number(getArticleDto.value.size) * 10);
    console.log(size)
    pageNumber.value = size
  }
}
// 接收爷爷的数据
const log = inject("logins")
// 监听父元素的数据变化
watch(() => props.trem, (New, Old) => {
  console.log("修改了新的是", New)
  // console.log(getArticleDto.value.termId);
  getArticleDto.value.termId = Number(New)
  defArticle()
})
defArticle()
// 下一页
const pageChange = (value: Number) => {
  console.log("下一页", value)
  getArticleDto.value.page = value
  defArticle()
}
const router = useRouter();
// 跳转详情
const jumpArticleDetail = (id: Number) => {
  console.log("跳转")
  router.push(`/articedetail?id=${id}`)
}
</script>

<template>
  <div class="article" style="margin-top: 20px" v-if="AdminStore.token !== ''">
    <div v-if="articleList.length != 0">
      <div v-for="item in articleList" style="margin: 15px 0;">
        <div class="card lcdibig">
          <div class="card-header">
            {{ item.title }}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ item.subheading }}</h5>
            <p class="card-text">{{ item.content }}</p>
            <a class="btn btn-primary" @click="jumpArticleDetail(item.id)">来这里</a>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="pageNumber" @change="pageChange" />
      </div>
    </div>
    <div v-else>
      <el-empty description="当前列表没有数据" />
    </div>
  </div>
  <div v-else>
    <el-empty>
      <el-button type="primary" @Click="log">点击登录</el-button>
    </el-empty>
  </div>
</template>

<style scoped lang="scss">
.article {
  >div {
    margin-top: 15px;
    // margin-bottom: 10px;
  }

  .page {
    display: flex;
    justify-content: end;
  }
}
</style>
