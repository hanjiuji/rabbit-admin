<script setup lang="ts">
import { toge } from '@/utils/togerutil.js'
import $ from "jquery/dist/jquery.min";
import { ref, watch } from 'vue';
import { useCounterStore } from './stores';
console.log("初始化cs");
const changColor = (value: Number) => {
  console.log("来了", value);
  if (value == 0) {
    $(".togimg").show()
  } else {
    $(".togimg").hide()
  }
}
// 切换页面颜色
const flag = ref(true);
// 拿到锁
const countStore = useCounterStore()
// 切换背景
const toges = () => {
  console.log("切换背景");
  let domStyle = document.documentElement.style;
  console.log("样式", domStyle);
  console.log(countStore.lock);
  if (countStore.lock) {
    if (flag.value) {
      domStyle.setProperty("--color1", "black");
      domStyle.setProperty("--font", "white");
      domStyle.setProperty("--black", "#2f2f2f");
      domStyle.setProperty("--shows", "0");
      domStyle.setProperty("--font2", "#e5e4e4");
      domStyle.setProperty("--bgcolor3", "#2f2f2f");
      domStyle.setProperty("--color4", "#c6c6c6");
      flag.value = false;
    } else {
      domStyle.setProperty("--color1", "white");
      domStyle.setProperty("--font", "black");
      domStyle.setProperty("--black", "ghostwhite");
      domStyle.setProperty("--shows", "0 5px 10px #c4c2c2");
      domStyle.setProperty("--font2", "black");
      domStyle.setProperty("--bgcolor3", "white");
      domStyle.setProperty("--color4", "black");
      flag.value = true;
    }
  }
  watch(() => countStore.lock, () => {
    console.log("锁变化了");
    domStyle.setProperty("--color1", "white");
    domStyle.setProperty("--font", "black");
    domStyle.setProperty("--black", "ghostwhite");
    domStyle.setProperty("--shows", "0 5px 10px #c4c2c2");
    domStyle.setProperty("--font2", "black");
    domStyle.setProperty("--bgcolor3", "white");
    domStyle.setProperty("--color4", "black");
    flag.value = true;
  })

}
</script>

<template>
  <div>
    <!--    <router-view/>-->
    <router-view v-slot="{ Component }" @chageColor="changColor">
      <transition name="ranimate">
        <component :is="Component" />
      </transition>
    </router-view>
    <div class="menue">
      <div>
        <div class="togimg" @click="toges">
          <i style="color: white" class="bi bi-circle-half"></i>
        </div>
        <el-backtop />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 425px) {
  .menue {
    position: fixed;
    bottom: 90px !important;
    right: 40px !important;
    border: 1px solid red;

  }
}

/*right: 101.5px;*/
.menue {
  position: fixed;
  bottom: 90px;
  right: 40px;
  border: 0px solid red;
}

.togimg {
  border: 0px solid red;
  position: relative;
  padding: 8px 12px;
  display: none;

  :hover {
    cursor: pointer;
  }

  :after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: gray;
    z-index: -1;
    border-radius: 50%;
  }
}

.ranimate-enter-active {
  animation: slideInLeft 0.5s;
}

.ranimate-leave-active {
  animation: slideOutLeft 0.3s;
}
</style>
