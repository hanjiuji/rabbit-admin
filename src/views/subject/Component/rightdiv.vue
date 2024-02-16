<script setup lang="ts">
import RcategoryI from '@/views/subject/Component/rcategory.vue'
import { Menu } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getlabel } from "@/api/label";
import { useAdminStore, useCategoryStore } from '@/stores';

defineOptions({
  name: 'rightI'
})
// 默认数据的颜色
type colors = {
  type: String,
  label: String
}
const items = ref<colors[]>([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' }
])
// 标签颜色
let color = ['success', 'info', 'danger', 'warning']
// 获取标签
const defLabel = async () => {
  const res = await getlabel()
  // 把类型加速颜色
  let list: String[] = res.data
  console.log(list)
  let list1: colors[] = list.map(item => {
    let index = Math.round(Math.random() * color.length);
    return { type: color[index], label: item }
  })
  if (list1) {
    items.value = list1;
  }
}
defLabel()
// 拿到仓库
const categoryStore = useCategoryStore();
// 获取分类的数据
const categoryList = ref(categoryStore.categoryList)
// 用户信息仓库
const adminStroe = useAdminStore();
// 类型
type userInfo = {
  id: Number,
  account: String,
  password: String,
  name: String,
  sex: Number,
  img: String,
  phone: String,
  leaveMsg: String,
  sign: Number,
  createTime: String,
  updateTime: String,
  token: String
  articleList: Number,
  categoryCount: Number,
  labelCount: Number,
}
// 用户信息
const userInfos = ref<userInfo>(adminStroe.token ? adminStroe.userInfo! : {
  id: 1,
  account: "2166056001",
  password: " ",
  name: "沐宛晴",
  sex: 1,
  img: "https://i0.hdslb.com/bfs/article/17e425951530319e3f565b520268b584266664645.jpg@1256w_1262h_!web-article-pic.webp",
  phone: "18281537565",
  leaveMsg: "人生最重要的不是所处的位置,而是所朝的方向",
  sign: 0,
  createTime: "2024-01-20 07-47-43",
  updateTime: "2024-01-20 07:47:45",
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDc4OTcxNjIsInJhIjp7ImlkIjoxfX0.7a6S4wxyyyr5nhEsvQLtUjWdVzcTU2vHKmheTDoCv0s",
  articleList: 6,
  categoryCount: 4,
  labelCount: 5
});
</script>

<template>
  <div class="font father">
    <div class="rigtdiv rigsdiv">
      <div class="rtims">
        <img :src="userInfos.img ? userInfos.img.toString() : 'https://candinya.com/images/candinya.webp'" alt="无法显示">
      </div>
      <p class="name font">{{ userInfos.name }}</p>
      <div class="name font" style="
      text-overflow:ellipsis;
      white-space:nowrap;
      width: 100%;
      overflow: hidden;
      padding: 0 15px;
      border: 0px solid red;">{{ userInfos.leaveMsg
      }}</div>
      <div class="imgs">
        <img src="@/assets/github.png">
        <img src="@/assets/Bilibili.png">
        <img src="@/assets/微信图标.png">
        <img src="@/assets/快手-新.png">
      </div>
      <div class="brdiv">
        <div>
          <div>文章</div>
          <p>{{ userInfos.articleList }}</p>
        </div>
        <div>
          <div>分类</div>
          <p>{{ userInfos.categoryCount }}</p>
        </div>
        <div>
          <div>标签</div>
          <p>{{ userInfos.labelCount }}</p>
        </div>
      </div>
    </div>
    <rcategory-i title="分类">
      <template #img>
        <el-icon size="20">
          <Menu />
        </el-icon>
      </template>
      <div class="demo-collapse">
        <el-collapse accordion style="border: 0px solid red; padding: 0 10px;">
          <el-collapse-item :name="i" v-for="(item, i) in categoryList">
            <template #title>
              <span class="font">{{ item.name }}</span>
              <el-icon class="header-icon">
                <info-filled />
              </el-icon>
            </template>
            <div>
              Consistent with real life: in line with the process and logic of real
              life, and comply with languages and habits that the users are used to;
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </rcategory-i>
    <rcategory-i title="标签">
      <div class="tag">
        <div>
          <el-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
            {{ item.label }}
          </el-tag>
        </div>
      </div>
    </rcategory-i>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1200px) {
  .father {
    display: none;
  }
}

.rigtdiv {
  width: 100%;
  height: 320px;
  border: 0px solid #d9d6d6;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .rtims {
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-radius: 50%;
    //padding: 10px 0;
    margin: 10px 0;
    overflow: hidden;

    img {
      width: 100%;
      transition: 0.25s;
    }

    img:hover {
      transform: scale(1.2);
    }
  }

  .imgs {
    img {
      width: 28px;
      //height: 100px;
      margin: 0 5px;
      // border: 1px solid red;
      transition: 0.25s;
    }

    img:hover {
      transform: scale(1.2);
    }
  }

  .name {
    border: 0px solid red;
    margin: 5px;
  }

  .brdiv {
    display: flex;
    justify-content: space-around;
    border: 0px solid red;
    width: 100%;
    margin-top: 15px;

    //padding: 10px 0;
    >div {
      display: flex;
      //height: 100%;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
      border: 0px solid red;

      p {
        margin-top: 2px;
      }
    }

    >div:hover {
      color: orange;
      cursor: pointer;
      // border: 1px solid red;
    }
  }

}

.tag {
  border: 0px solid red;
  padding-bottom: 20px;

  >div {
    border: 0px solid red;
    margin-bottom: 5px;
  }
}

.el-collapse-item__header {
  background: none !important;
}
</style>
