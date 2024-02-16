<script setup lang="ts">
import { getArticle } from '@/api/article';
import { it } from 'element-plus/es/locale/index.mjs';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: "articeallI"
})

// 默认的分页数据
type ArticleDto = {
  page: Number,
  size: Number,
}
// 获取文章的参数
const getArticleDto = ref<ArticleDto>({
  page: 1,
  size: 8,
})
//渲染文章数据
const articleList = ref<[] | article[]>([])
// 页面number
const pageNumber = ref<Number>(100)
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
// 获取全部的文章
const defAllArticle = async () => {
  const res = await getArticle(getArticleDto.value)
  console.log(res)
  if (res.data) {
    articleList.value = res.data.data
    let size = (res.data.total / Number(getArticleDto.value.size) * 10);
    console.log(size)
    pageNumber.value = size
  }
}
defAllArticle()
// 下一页
const pageChange = (value: Number) => {
  console.log("下一页", value)
  getArticleDto.value.page = value
  defAllArticle()
}
// 路由
const router = useRouter();
// 跳转文章详细
const jumpArticleDetail = (id: Number) => {
  console.log("跳转")
  router.push(`/articedetail?id=${id}`)
}
</script>

<template>
  <div class="headBox">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h3 style="margin: 20px 0 " class="font">所有文章</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="fxcontent">
            <div class="fxcontents lcdibig" v-for="item in articleList" :key="item.id.toString" @click="jumpArticleDetail(item.id)" >
              <div class="contentimgs">
                <img :src="item.img?item.img.toString():'https://candinya.com/images/thumb/thumb_9.webp'" alt="">
              </div>
              <div class="cotentp">
                <p style="color: palevioletred">{{ item.title }}</p>
                <p>{{ item.subheading }}</p>
                <p>{{ item.createTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="fxendpage">
            <el-pagination background layout="prev, pager, next" :total="pageNumber" @change="pageChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fxcontent {
  //width: 300px;
  border: 0px solid red;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .fxcontents {
    width: 272px;
    //height: 250px;
    border: 0px solid gray;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 5px 10px #c9c7c7;
    margin: 5px 0;
    transition: 0.25s;

    .contentimgs {
      height: 170px;
      overflow: hidden;

      //margin: 0 3px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        transition: 1s;
      }

      img:hover {
        transform: scale(1.2);
      }
    }

    .cotentp {
      margin: 0 8px;
      padding: 10px 0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 43%;
      justify-content: space-between;
      border: 0px solid red;

      p {
        margin: 0;
        padding: 2px 0;
        border: 0px solid red;
      }

      p:first-child {
        font-size: 14px;
      }

    }
  }

  .fxcontents:hover {
    transform: translateY(-5px);
  }
}

.fxendpage {
  display: flex;
  justify-content: end;
  margin: 20px;
}
</style>
