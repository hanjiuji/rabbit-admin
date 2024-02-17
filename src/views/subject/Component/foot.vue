<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs'

defineOptions({
  name: 'footI'
})
const localData = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
</script>

<template>
  <div class="footT">
    <div class="fontTw">
      <div class="fontLl">
        <dl>
          <dt class="cols">文章</dt>
          <dd>分类</dd>
          <dd>标签</dd>
          <dd>文章数据</dd>
        </dl>
        <dl>
          <dt class="cols">关于我</dt>
          <dd>四书</dd>
          <dd>五经</dd>
        </dl>
        <dl>
          <dt class="cols">发现</dt>
          <dd>分类</dd>
        </dl>
        <dl>
          <dt class="cols">娱乐</dt>
          <dd>相册</dd>
          <dd>记事本</dd>
        </dl>
      </div>
      <div class="footrr">
        <div class="footrrt">
          <p>联系我</p>
          <div class="imgs">
            <img src="@/assets/github.png">
            <img src="@/assets/Bilibili.png">
            <img src="@/assets/微信图标.png">
            <img src="@/assets/快手-新.png">
          </div>
        </div>
        <div class="footrrb">
          <p>当前时间</p>
          <p>{{ localData }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 800px) {
  .footrr {
    display: none;
  }
}

.footT {
  margin-top: 15px;

  .fontTw {
    background: #2f2f2f;
    height: 200px;
    color: white;
    position: relative;

    .fontLl {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      border: 0px solid red;

      dl {
        border: 0px solid red;
        display: flex;
        padding: 0 20px;
        flex-direction: column;
        align-items: center;

        .cols+dd {
          border: 0px solid red;
          margin-top: 10px;
        }

        .cols~dd {
          color: #b5b5b5;
        }
      }
    }

    .footrr {
      color: white;
      position: absolute;
      right: 0;
      top: 20px;

      .footrrt {
        border: 0px solid red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .imgs {
          padding: 0 50px;

          img {
            width: 25px;
            border: 0px solid red;
            margin: 0 5px;
          }
        }
      }

      .footrrb {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
