<script setup lang="ts">


defineOptions({
  name: 'rcategoryI'
})
defineProps({
  title: {
    type: String,
    default: "分类"
  }
})
</script>

<template>
  <div class="catatigory rigsdiv" style="margin-top: 15px">
    <div class="ridivt">
      <span>
        <slot name="img" /> {{ title }}
      </span>
      <span>更多</span>
    </div>
    <div class="memo">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.catatigory {
  width: 100%;
  //height: 300px;
  max-height: 300px;
  border: 0px solid #d9d6d6;
  border-radius: 15px;
  overflow: auto;
  padding: 5px 0;

  .ridivt {
    display: flex;
    justify-content: space-between;
    border: 0px solid red;
    padding: 10px;

    //font-size: 17px;
    span {
      display: flex;
      align-items: center;
    }
  }
}</style>
