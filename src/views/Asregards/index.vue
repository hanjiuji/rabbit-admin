<script setup lang="ts">
import { useAdminStore } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


defineOptions({
  name: "gyuI"
})
const adminLabel = ref<String[]>(["可爱", "悠哉哉", "无聊中", "追剧中", "好运涟涟", "元气满满"])
// 拿到用户仓库
const adminStore = useAdminStore()
// 路由
const router = useRouter()
if (!adminStore.token) { 
  adminStore.userInfo!.img= 'https://i0.hdslb.com/bfs/article/17e425951530319e3f565b520268b584266664645.jpg@1256w_1262h_!web-article-pic.webp'
  router.push("/articeHome")
}
</script>

<template>
  <div>
    <div class="headBox">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <h4 style="margin: 20px 0 ">关于我</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="cardf">
              <div class="cards">
                <img
                  :src="adminStore.userInfo!.img ? adminStore.userInfo!.img.toString() : 'https://i0.hdslb.com/bfs/article/17e425951530319e3f565b520268b584266664645.jpg@1256w_1262h_!web-article-pic.webp'"
                  alt="" class="cover">
                <div class="head">
                  <div class="data">
                    <div class="title1">
                      <div>{{ adminStore.userInfo!.name ? adminStore.userInfo!.name : "小兔子" }}</div><span>INFO</span>
                    </div>
                    <div class="title2">{{ adminStore.userInfo!.leaveMsg ? adminStore.userInfo!.leaveMsg : "兔子爱吃萝卜" }}
                    </div>
                  </div>
                </div>
                <div class="foot">
                  <div class="tags">
                    <div>
                      <p class="tg" v-for="item in adminLabel">{{ item }}</p>
                    </div>
                  </div>
                  <div class="introduce">
                    <p>
                    <p style="font-weight: bold;">《山居秋暝》</p>
                    <p>空山新雨后，天气晚来秋。</p>
                    <p>明月松间照，清泉石上流。</p>
                    <p>竹喧归浣女，莲动下渔舟。</p>
                    <p>随意春芳歇，王孙自可留。</p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-sm">
            <h4>《玉楼春》</h4>
            <div>
              <p>尊前拟把归期说。未语春容先惨咽。</p>
              <p>人生自是有情痴，此恨不关风与月。</p>
              <p>离歌且莫翻新阕。一曲能教肠寸结。</p>
              <p>直须看尽洛城花，始共春风容易别。</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cardf {
  display: flex;

  .cards {
    width: 680px;
    height: 480px;
    border: 0px solid red;
    position: relative;
    background: #f9f2f2;
    border-radius: 10px;
    overflow: hidden;

    .head {
      height: 250px;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }

    .head::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: url("@/assets/card1.webp");
      background-size: cover;
      z-index: -1;
      transform: skewY(-4deg);
      transform-origin: 0 0;
    }

    .data {
      padding: 105px 0 0 280px;
      text-shadow: 0 0 20px #000;
    }

    .data .title1 {
      color: white;
      font-size: 35px !important;
      font: 900 50px '';
      margin-bottom: 5px;
      // position: relative;
      display: flex;
      // justify-content: center;
      border: 0px solid red;
    }

    .data .title1 span {
      // position: absolute;
      margin-top: 8px;
      height: 20px;
      margin-left: 12px;
      background: #ffe44c;
      border-radius: 5px;
      color: #000000;
      font-size: 14px;
      padding: 0px 4px;
    }

    .data .title2 {
      color: #fff;
      // font: 500 24px '';
      font-size: 21px;
    }

    .foot {
      line-height: 26px;
      color: #444;
      border: 0px solid blue;
      height: 230px;
      display: flex;
    }

    .tags {
      //padding-left: 30px;
      //padding-top: 50px;
      //padding: 100px 20px 0;
      width: 280px;
      height: 100%;
      //text-align: center;
      border: 0px solid red;
      //height: 100px;
      //margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      //padding: 0 20px;
      >div {
        padding-top: 30px;
        border: 0px solid red;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .tg {
        background: rgb(149, 178, 255);
        color: #fff;
        border-radius: 10px;
        display: inline-block;
        padding: 3px 8px;
        font-size: 14px;
        margin-right: 4px;
        //line-height: 35px;
        cursor: pointer;
      }

      .tg:hover {
        background: #eee4ad;
        color: #444;
      }
    }

    .introduce {
      // padding: 25px 30px 0 5px;
      width: 480px;
      border: 0px solid red;
    }

    .cover {
      position: absolute;
      top: 110px;
      left: 30px;
      width: 200px;
      z-index: 2;
      border-radius: 500px;
      border: 10px #fff solid;
      box-shadow: 0 5px 10px #00000065;
    }
  }
}
</style>
