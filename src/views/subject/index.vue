<script setup lang="ts">
import HeadI from '@/views/subject/Component/head.vue'
import { toge } from '@/utils/togerutil.js'
import RightI from '@/views/subject/Component/rightdiv.vue'
import FootI from '@/views/subject/Component/foot.vue'
import { onMounted, provide, ref, watch } from 'vue'
import LindexI from '@/views/Login/index.vue'
import { useCounterStore } from "@/stores/index.ts"

defineOptions({
  name: 'indexI'
})
const CounterStore = useCounterStore();
// const flag=ref(false);
/*const toges=()=>{
  let domStyle = document.documentElement.style;
  console.log("toge")
  console.log(flag.value)
  // console.log(domStyle)
  if (flag.value){
    domStyle.setProperty("--black","ghostwhite");
    domStyle.setProperty("--font","black");
    flag.value=false;
  }else {
    domStyle.setProperty("--black","#2f2f2f");
    domStyle.setProperty("--font","white");
    flag.value=true;
  }

}*/
// 获取登录组件的实例
const loginsl = ref();
// 测试登录组件显示
const loginmethod = () => {
  console.log(loginsl.value)
  loginsl.value.open();
}
// 优化变颜色
const emit = defineEmits(["chageColor"])
// win滚动事件
const defscroll = () => {
  console.log("滚动")
  // emit("chageColor", 0)
  let doc = document.documentElement;
  let tops = <HTMLElement>document.querySelector(".topmenue");
  // console.log(doc);
  // console.log(tops)
  window.addEventListener("scroll", function () {
    // console.log("欧克");
    let top = parseInt(String(doc.scrollTop));
    // console.log(top);
    if (top >= 200) {
      // console.log("ok1")
      // $("topmenue").addClass("slide-in-blurred-top ")
      // tops.style.top = "0";
      emit("chageColor", 0)
    } else if (top >= 70) {
      // console.log("ok2");
      // emit("chageColor", 0)
      tops.style.top = "0";
      emit("chageColor", 1)
    } else {
      tops.style.top = "-100px";
      emit("chageColor", 1)
    }
  })
}
provide("logins", loginmethod)
onMounted(() => {
  defscroll();
})
</script>

<template>
  <div>
    <div class="headBox nave">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <head-i />
          </div>
        </div>
      </div>
    </div>
    <div class="headBox" style="margin-top: 15px">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-xl-9" style="border: 0px solid red">
            <RouterView :login="loginmethod" />
          </div>
          <div class="col-3" style="border: 0px solid red;padding: 0;">
            <right-i />
          </div>
        </div>
      </div>
    </div>
    <foot-i />
    <!-- <button class="black" @click="toge">按钮</button> -->
    <!-- <button @click="loginmethod">登录</button> -->
    <!-- {{CounterStore.count}} -->
    <!-- <button @click="CounterStore.togeLogin(loginmethod)">按钮</button> -->
    <lindex-i ref="loginsl" />
    <div class="topmenue nave">
      <head-i />
    </div>
  </div>
</template>

<style scoped lang="scss">
.headBox {
  border: 0px solid red;
}

.topmenue {
  position: fixed;
  width: 100%;
  top: -100px;
  left: 0;
  //border: 1px solid blue;
  display: flex;
  justify-content: center;
  z-index: 1;
  transition: 0.5s;
  background-color: white;
}
</style>
