<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, UserFilled, ChatDotRound } from "@element-plus/icons-vue";
import { useRoute } from 'vue-router'
import { getArticleOne } from '@/api/article';
import { getArticleReview, saveArticleReview } from '@/api/articleReview';
import { useAdminStore } from '@/stores';
import { id } from 'element-plus/es/locale/index.mjs';
import { SUCCESS } from '@/utils/BaseContent';
defineOptions({
  name: "aindexI"
})
// 文本域名
const textarea = ref('')
// 名称
const names = ref('')
// 邮箱
const email = ref('')
// 地址
const address = ref('')
// 解析参数
const router = useRoute()
// 用户仓库
const adminStroe = useAdminStore()
// 拿到父亲的打开登录函数
const props = defineProps({
  login: {
    type: Function,
    defualut: () => {
      return Function
    }
  }
})
// 拿到参数
const Id = router.query.id
type Entity = {
  id: Number,
  title: String,
  img: any,
  subheading: String,
  content: String,
  labelId: Number,
  adminName: String,
  articleReviewCount: Number,
  labelNames: String,
  articleCategoryId: Number,
  adminId: Number,
  createTime: String,
  updateTime: String
}
// 渲染文章主题
// TODO 少了赞和作者标签名
const articleEntity = ref<Entity>({
  id: 2,
  title: "《宝葫芦的秘密》",
  img: null,
  subheading: "梦醒后的王葆脱胎换骨",
  content: "他是个爱做梦的小男孩，又很懒惰。有一次他得到了一个宝葫芦，并成了它的主人。宝葫芦为他钓鱼、找吃的……宝葫芦为他做了很多事，却也给他带来很多麻烦。",
  labelId: 2,
  adminName: "沐宛晴",
  articleReviewCount: 2,
  labelNames: "风优",
  articleCategoryId: 4,
  adminId: 1,
  createTime: "2024-01-28 09:09:35",
  updateTime: "2024-01-28 09:09:37"
});
// 获取文章详细
const defArticleDetail = async () => {
  if (Id) {
    const res = await getArticleOne(Number(Id))
    console.log(res.data);
    if (res.data) {
      if (!res.data.img) {
        res.data.img = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F31%2F20180731133228_dUWaH.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708521875&t=f8457dde1d1fb805f8c9b2e4a4768d73"
      }
      articleEntity.value = res.data
    }
  }
}
defArticleDetail()
// 获取文章参数类型
type ArticleReviewDto = {
  page: Number,
  size: Number,
  id: Number
}
// 获取文章参数
const getarticleReviewDto = ref<ArticleReviewDto>({
  page: 1,
  size: 2,
  id: Id ? Number(Id) : 1
})
// 评论列表
type articleReviewDto = {
  id: Number,
  articleId: Number,
  adminId: Number,
  content: String,
  praise: Number,
  adminImg: String,
  adminName: String,
  createTime: String,
  updateTime: String
}
// 拿到评论的列表渲染
const articleReview = ref<articleReviewDto[]>([{
  id: 1,
  articleId: 2,
  adminId: 1,
  content: "太厉害了",
  praise: 5,
  adminImg: "https://i0.hdslb.com/bfs/article/17e425951530319e3f565b520268b584266664645.jpg@1256w_1262h_!web-article-pic.webp",
  adminName: "沐宛晴",
  createTime: "2024-01-28 09:40:45",
  updateTime: "2024-01-28 09:40:47"
}]);
// 获取文章评论
const defArticleReview = async () => {
  const res = await getArticleReview(getarticleReviewDto.value)
  console.log("获取文章评论", res.data)
  articleReview.value = res.data.data
}
defArticleReview()

// 准备提交文章评论
const submitDetail = async () => {
  // 检测参数
  if (names.value == '' && email.value == '' && address.value == '') {
    return ElMessage.warning("请输入信息")
  }
  // 检查是不是有令牌
  if (!adminStroe.token) {
    props.login!()
    return ElMessage.warning("用户还未登录")
  }
  // 收集参数提交文章
  // 用户的id
  let adminId = adminStroe.userInfo!.id
  const res=await saveArticleReview({
    articleId: Id,
    adminId,
    content: textarea.value
  })
  if (res.msg == SUCCESS) {
    ElMessage.success("新增成功")
  } else { 
    ElMessage.warning("新增失败")
  }
}
</script>

<template>
  <div class="deaDivf font">
    <div class="deatopcont navs">
      <div class="deatillTitle">
        <h4>{{ articleEntity.title }}</h4>
      </div>
      <div class="deatillfu">
        <div>
          <el-icon>
            <Calendar />
          </el-icon> {{ articleEntity.createTime }}
        </div>
        <div>
          <el-icon>
            <UserFilled />
          </el-icon>作者{{ articleEntity.adminName }}
        </div>
        <div>
          <el-icon>
            <ChatDotRound />
          </el-icon>{{ articleEntity.articleReviewCount }}评论
        </div>
      </div>
      <hr class="black" style="width: 90%">
      <p class="deatecontent" style="margin-bottom: 20px">{{ articleEntity.subheading }}</p>
      <div class="imgone">
        <img :src=articleEntity.img alt="">
      </div>
      <div>
        <h5 style="margin:20px 0 0 20px ">内容介绍</h5>
      </div>
      <div class="deatecontent deatexx">
        {{ articleEntity.content }}
      </div>
      <div class="deateend">
        <div>
          <i class="bi bi-tag"></i>
          <span>{{ articleEntity.labelNames }}</span>
        </div>
        <div>
          <span>最后编辑{{ articleEntity.updateTime }}</span>
        </div>
      </div>
    </div>
    <div class="nextarticled">
      <div class="rigsdiv">下一篇&gt;</div>
    </div>
    <div class="deabotcont navs">
      <div class="detapl pl">
        <div>
          <div>
            <div class="deatpln">
              名称
            </div>
            <div>
              <el-input v-model="names" placeholder="Please input" />
            </div>
          </div>
          <div>
            <div class="deatpln">
              邮箱
            </div>
            <div>
              <el-input v-model="email" placeholder="Please input" />
            </div>
          </div>
          <div>
            <div class="deatpln">
              网址
            </div>
            <div>
              <el-input v-model="address" placeholder="Please input" />
            </div>
          </div>
        </div>
        <div class="detaplbj">
          <el-input v-model="textarea" :rows="7" type="textarea" placeholder="Please input" />
        </div>
        <div class="plend">
          <el-button type="success" @click="submitDetail">提交</el-button>
        </div>
      </div>
      <div class="detapltj">
        <div>
          {{ articleReview.length}}评论
        </div>
        <div>
          按正序
          按倒序
          按热度
        </div>
      </div>
      <!-- https://avatars.githubusercontent.com/u/110729988?v=4 -->
      <div class="plxr" v-for="item in articleReview">
        <div>
          <img :src="item.adminImg ? item.adminImg.toString()
            : 'https://avatars.githubusercontent.com/u/110729988?v=4'">
        </div>
        <div>
          <div class="plxrtop">
            <span>{{ item.adminName }}:{{ item.createTime }}</span>
            <div>
              <i class="bi bi-heart"></i>
              {{ item.praise }}
            </div>
          </div>
          <div class="plxrbot">
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 425px) {
  .deatillfu {
    display: block !important;
    // color: red;
  }
}

.deaDivf {
  //height: 800px;
  border: 0px solid red;

  .deatopcont {
    //height: 800px;
    border: 0px solid blue;
    padding: 50px 0 30px 0;
    border-radius: 15px;

    .deatillTitle {
      display: flex;
      justify-content: center;
    }

    .deatillfu {
      display: flex;
      justify-content: center;
      margin: 10px 0 25px 0;

      div {
        display: flex;
        align-items: center;
        margin: 0 10px;
      }
    }

    .imgone {
      border: 0px solid red;
      height: 420px;
      margin: 0 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .deatecontent {
      margin: 0 40px;
      letter-spacing: 5px;
      text-indent: 2em;
      line-height: 45px;
      //color: #bcbbbb;
    }

    .deateend {
      display: flex;
      justify-content: space-between;
      margin: 20px 20px 0;
      font-size: 15px;
      color: gray;
    }
  }

  .deabotcont {
    // height: 800px;
    padding-bottom: 20px;
    border-radius: 15px;
    // border: 1px solid pink;
    padding-top: 20px;

    .detapl {
      border: 1px solid gray;
      //height: 200px;
      margin: 0px 20px 20px;
      border-radius: 10px;

      >div:first-child {
        border-bottom: 2px dashed gray;
        //margin: 5px 0;
        padding: 12px;
        display: flex;
        //border: 1px solid red;
        align-content: end;
        justify-content: space-between;

        >div {
          display: flex;
          border: 0px solid blue;
          align-items: center;
          justify-content: center;

          .deatpln {
            margin-right: 10px;
          }
        }
      }

      .detaplbj {
        border: 0px solid red;
        padding: 0 5px;
        margin: 10px 0;
      }

      .plend {
        margin: 0 5px 10px 0;
        display: flex;
        justify-content: end;
      }
    }

    .detapltj {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
  }

  .nextarticled {
    display: flex;
    justify-content: end;

    >div {
      border: 0px solid red;
      padding: 10px;
      margin: 10px 0;
      transition: 1s;
    }

    div:hover {
      color: deepskyblue;
      cursor: pointer;
    }

  }

  .plxr {
    display: flex;
    border: 0px solid red;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 15px;

    div {
      border: 0px solid red;
    }

    >div:first-child {
      width: 60px;
      height: 60px;
      border-radius: 50%;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }

    >div:last-child {
      width: 90%;

      .plxrtop {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .plxrbot {
        margin: 5px 0;
        border-bottom: 1px dashed #9f9e9e;
      }
    }
  }
}
</style>
