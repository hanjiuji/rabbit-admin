<script setup lang="ts">
import { getMessageBoard, putMessageBoard } from '@/api/messageBoard';
import { getMessageBoardC, saveMessageBoardC } from '@/api/messageBoardC';
import { useAdminStore, useMessageBoardStore } from '@/stores';
import { SUCCESS } from '@/utils/BaseContent';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

defineOptions({
  name: "msgboardI"
})
// 获取节点留言板
const elementNode = ref();
// 移入留言板
const enter = () => {
  // console.log("移入了");
  // console.log(elementNode)
  elementNode.value.style.height = "500px";
}
// 移除留言板
const leave = () => {
  elementNode.value.style.height = "200px";
}
// 绑定值
const inpt = ref("")
// 留言板值
const content = ref('')
// 从用户仓库获取用户id
const adminStore = useAdminStore()
// 留言板仓库
const messageBoard = useMessageBoardStore()
// 路由
const router = useRouter();
// 获取留言板
const defMessageBoard = async () => {
  if (!adminStore.token) {
    router.push("/articeHome")
    return ElMessage.warning("请先登录")
  }
  const res = await getMessageBoard(adminStore.userInfo!.id)
  console.log(res)
  if (!res.data && res.data.length != 0) {
    return ElMessage.warning("由于网络不佳,请重新刷新")
  }
  content.value = res.data.content
  messageBoard.setMessageBoardId(res.data.id)
  // 留言板加载成功了之后在加载评论
  defMessBoardC(res.data.id)
}
defMessageBoard()
// 修改函数
const change = async () => {
  if (!adminStore.token) {
    return ElMessage.warning("请先登录")
  }
  // console.log("修改了")
  console.log(content.value)
  // console.log(messageBoard.MessageBoardId)
  if (!messageBoard.MessageBoardId) {
    // 没有留言板id需要重新拉取
    return defMessageBoard()
  }
  const res=await putMessageBoard(messageBoard.MessageBoardId, content.value)
  if (res.msg == SUCCESS) {
    ElMessage.success("修改成功")
    defMessageBoard()
  } else {
    ElMessage.warning("修改失败没有请重新修改")
  }
}
// 留言板评论类型
type MessageBoardDto = {
  id: Number,
  messageBoardId: Number,
  praise: Number,
  content: String,
  adminId: Number,
  adminName: String,
  adminImg: String,
  createTime: String,
  updateTime: String
}
// 渲染留言板评论
const MessBoardCList = ref<MessageBoardDto[]>()
// 获取留言板评论
const defMessBoardC = async (id: Number) => {
  const res = await getMessageBoardC(id)
  console.log(res);
  MessBoardCList.value = res.data
}
// 提交留言板评论（仅限自己）
const submitMessageBoardC =async () => {
  console.log("提交评论");
  if (!adminStore.token) {
    return ElMessage.warning("请先登录")
  }
  if (!messageBoard.MessageBoardId) { 
    return ElMessage.warning("重新拉取数据")
  }
  const res= await saveMessageBoardC({
    messageBoardId:messageBoard.MessageBoardId,
    content:inpt.value,
    adminId:adminStore.userInfo!.id
  })
  if (res.msg == SUCCESS) {
    ElMessage.success("评论成功")
    defMessBoardC(messageBoard.MessageBoardId)
  } else { 
    ElMessage.warning("请输入信息")
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <h4 style="margin: 20px 0 ">留言板</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="msgbox">
          <div class="msgboxcontent" ref="elementNode" @mouseenter="enter" @mouseleave="leave">
            <div class="tishi">
              <!-- <p>你可以在这</p>
              <p>留下一些足迹</p> -->
              <textarea class="form-control content" aria-label="With textarea" placeholder="你可以留下点什么" v-model="content"
                @change="change"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="lysub">
          <div>
            <div>评论</div>
          </div>
          <div style="height: 100px;border: 0px solid red">
            <textarea style="height: 100%" class="form-control" aria-label="With textarea" v-model="inpt"></textarea>
          </div>
          <div style="display:flex;justify-content: end">
            <el-button type="success" @click="submitMessageBoardC">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div style="padding: 15px 0;border: 0px solid red">
          {{ MessBoardCList?.length }}条评论
        </div>
        <div class="jsbplxrs">
          <div class="plxr" v-for="item in MessBoardCList">
            <div><img
                :src="item.adminImg ? item.adminImg.toString() : 'https://avatars.githubusercontent.com/u/110729988?v=4'">
            </div>
            <div>
              <div class="plxrtop">
                <span>{{ item.adminName }}:{{ item.createTime }}</span>
                <div>
                  <i class="bi bi-heart"></i>
                  {{ item.praise }}
                </div>
              </div>
              <div class="plxrbot">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.msgbox {
  display: flex;
  justify-content: center;

  .msgboxcontent {
    width: 500px;
    height: 200px;
    border: 0px solid red;
    border-radius: 15px;
    box-shadow: 0 0 15px #b9b9b9;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1s;

    .tishi {
      display: flex;
      border: 0px solid red;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 10px;

      >p {
        margin: 0;
        font-weight: bold;
      }

      .content {
        width: 100%;
        height: 100%;
        border: 0px solid red;
      }

      .content::placeholder {
        text-align: center;
      }
    }
  }
}

.lysub {
  div {
    margin: 10px 0;
  }
}

.jsbplxrs {
  background: ghostwhite;
  padding: 20px 0;
  border-radius: 10px;
}

.plxr {
  display: flex;
  border: 0px solid red;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 15px;

  div {
    border: 0px solid red;
  }

  >div:first-child {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  >div:last-child {
    width: 90%;

    .plxrtop {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .plxrbot {
      margin: 5px 0;
      border-bottom: 1px dashed #9f9e9e;
    }
  }
}
</style>
