<script setup lang="ts">
import { ref } from 'vue';
import ArticleI from './article.vue'
import CategoryI from './categoy.vue'
import LeftI from './leftdiv.vue'

defineOptions({
  name: 'articleI'
})
// 声明选中的下标
const active = ref<Number>(2)
// 切换下标
const togeIndex = (value: Number) => {
  console.log("传递", value)
  active.value = value
}
</script>

<template>
  <div>
    <left-i />
    <category-i @updata-index="togeIndex" :active="Number(active)" />
    <article-i :trem="Number(active)" />
  </div>
</template>

<style scoped lang="scss"></style>
