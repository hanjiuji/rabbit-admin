<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getArticleCategory } from "@/api/articleCategory"
import { useCategoryStore } from '@/stores/categoryStore';


defineOptions({
  name: 'categoryI'
})
// 接收默认选中
defineProps({
  active: {
    type: Number,
    defualt: 0
  }
})
// 子传父
const emit = defineEmits(["updataIndex"])
// 获取分类类型
type categorys = {
  id: Number,
  name: String
}
// 默认数据
const category = ref<categorys[] | []>([{
  id: 0,
  name: "首页"
}, {
  id: 1,
  name: "叙事"
}, {
  id: 2,
  name: "抒情"
}])
// '首页', '叙事', '抒情', '郭默默', '刘大帅'
// const active = ref(0);
// 分类仓库优化请求
const catrgoryStore = useCategoryStore()
// 获取分类的数据
const defCategory = async () => {
  //分类仓库优化请求
  catrgoryStore.getCategoryList()
  const res = catrgoryStore.categoryList
  console.log(res)
  if (res) {
    category.value = res
  }
}
defCategory()
// 切换下标
const togeIndex = (index: Number) => {
  emit("updataIndex", index);
}
</script>

<template>
  <div class="cfather lcdibig cateogry">
    <ul>
      <li v-for="(item) in category" :key="Number(item.id)" :class="[active == item.id ? 'active' : '', 'lcdiv']"
        @click="togeIndex(item.id)">
        {{ item.name }}</li>
      <li>更多</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.cfather {
  border: 0px solid red;
  margin-top: 10px;
  box-shadow: 0 5px 10px #c4c2c2;
  padding: 8px 0;
  border-radius: 3px;
  //display: flex;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;

    li {
      list-style: none;
      //border: 1px solid blue;
      padding: 5px 15px;
      border: 0px solid red;
      // margin: 5px 0;
      border-radius: 5px;
      cursor: pointer;
    }

    li:last-child {
      position: absolute;
      right: 0;
    }
  }
}

.active {
  background: blue;
  color: white;
}
</style>
