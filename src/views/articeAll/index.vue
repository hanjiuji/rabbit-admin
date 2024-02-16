<script setup lang="ts">
import HeadI from '@/views/subject/Component/head.vue'

defineOptions({
  name:"allI"
})
</script>

<template>
<div>
  <div class="headBox navs">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <head-i/>
        </div>
      </div>
    </div>
  </div>
  <RouterView/>
</div>
</template>

<style scoped lang="scss">

</style>
