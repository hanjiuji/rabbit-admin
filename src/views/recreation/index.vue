<script setup lang="ts">
import { getAdminPicture } from '@/api/adminPicture';
import { useAdminStore } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: "recrpicI"
})
const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
// 拿到用户仓库
const adminStore = useAdminStore()
// 渲染图片类型
type adminPicEntityDto = {
  id: Number,
  adminId: Number,
  img: String,
  createTime: String,
  updateTime: String
}
// 渲染的图片
const adminPicEntity = ref<adminPicEntityDto[]>()
// 预览列表
const adminPicEntityDtoList = ref<String[]>()
// 路由
const router = useRouter();
// 获取用户图片
const defAdminPicture = async () => {
  try {
    if (!adminStore.userInfo!.id) {
      router.push("/articeHome")
      return ElMessage.warning("请先登录")
    }
    const res = await getAdminPicture(adminStore.userInfo!.id)
    console.log(res);
    if (res.data) {
      adminPicEntity.value = res.data.picEntity
      adminPicEntityDtoList.value = res.data.picList
    }
  } catch (e) {
    console.log(e);
    router.push("/articeHome")
    return ElMessage.warning("请先登录")
  }
}
defAdminPicture()
// 预览下标
const previewIndex = ref<Number>(0)
// 触发预览
const toge = (index: Number) => {
  console.log("切换", index);
  previewIndex.value = index
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="xchead">
          <h3 style="margin: 20px 0 " class="font">个人相册</h3>
        </div>
        <div class="pics">
          <div class="demo-image__preview">
            <el-image style="width: 200px; height: 200px" v-for="(item, i) in adminPicEntity" :src="item.img"
              :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="adminPicEntityDtoList"
              :initial-index="previewIndex" @show="toge(i)" fit="cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xchead {
  display: flex;
  justify-content: center;
}

//
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

.pics {
  border: 0px solid red;
  display: flex;
  justify-content: center;

  >div {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0px solid blue;
    flex-wrap: wrap;
  }
}
</style>
