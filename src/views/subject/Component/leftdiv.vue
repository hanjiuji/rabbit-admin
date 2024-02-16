<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'leftI'
})
</script>

<template>
  <div>
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://img.zcool.cn/community/01527b5c2ce8d2a8012029ac1a4fc7.jpg@1280w_1l_2o_100sh.jpg" class="d-block w-100" alt="...">
          <!-- <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div> -->
        </div>
        <div class="carousel-item">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F06%2F20200106191445_4YM2a.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708425952&t=4344a484d1ba71c378cd20c4741f63f4" class="d-block w-100" alt="...">
          <!-- <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div> -->
        </div>
        <div class="carousel-item">
          <img src="https://ts1.cn.mm.bing.net/th/id/R-C.8687952c4f159da9d54f5332fd9779ab?rik=z1pSmTstKfg24g&riu=http%3a%2f%2fpic.bizhi360.com%2fbpic%2f54%2f10054_4.jpg&ehk=%2fI3yVeCq4Mc46BtpOWklmXT22r4RT5eK0Ehov6SJFFM%3d&risl=&pid=ImgRaw&r=0" class="d-block w-100" alt="...">
          <!-- <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div> -->
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

.carousel-item img{
  height: 400px;
  object-fit: cover;
}
</style>
