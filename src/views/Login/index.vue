<script setup lang="ts">
import { onMounted, ref } from 'vue'
import $ from "jquery/dist/jquery.min";
import { getlogin, saveAdmin } from '@/api/admin';
import { useAdminStore } from "@/stores";
import { SUCCESS } from '@/utils/BaseContent';

defineOptions({
  name: "lindexI"
})
// 账户名字
const admin = ref('');
// 密码
const password = ref('');
// 定义类型
type tp = {
  type: string,
  img: string
}
// 切换图标Anp
const typeAndP = ref<tp>({
  type: 'password',
  img: 'bi-eye-slash'
});
// 切换登录或注册
const toge = ref<boolean>(true);
// console.log(toge.value)
// 点击切换图标
const togeAnds = () => {
  if (typeAndP.value.type == 'password') {
    typeAndP.value.type = 'text';
    typeAndP.value.img = 'bi-eye';
  } else {
    typeAndP.value.type = 'password';
    typeAndP.value.img = 'bi-eye-slash';
  }
}
// 定时器名字
const timmer = ref<Number | null>(null)
// 关闭登录窗口
const close = () => {
  timmer.value = null
  $('.mask').animate({
    opacity: '0',
    zIndex: '-1'
  }, 300);
}
// 打开登录
const open = () => {
  $('.mask').css("zIndex", '4');
  $('.mask').animate({
    opacity: '1',
  }, 300);
}
// 仓库用户
const useadmin = useAdminStore();
// 登录
const login = async () => {
  console.log("登录")
  if (admin.value == '' && password.value == '') {
    ElMessage.warning("请输入账号和密码")
  }
  // 发起请求
  const res = await getlogin(admin.value, password.value)
  console.log(res.data)
  if (res.data) {
    // 保存仓库
    useadmin.token = res.data.token
    useadmin.setUserInfo(res.data)
    close()
    ElMessage.success("登录成功")
  }
}

// 获取元素
const domyzm = ref<Element>();
// 获取验证码
const getverification = () => {
  console.log("获取验证码");
  // console.log(timmer.value);
  if (timmer.value != null) {
    return ElMessage.warning("验证码时间还没到")
  }
  // console.log(domyzm.value);
  // let x = document.querySelector(".yzm");
  let time = 60;
  // domyzm.value.innerHTML = "20";
  // domyzm.value?.innerHTML
  // domyzm.value.;
  const tim = () => {
    domyzm.value!.innerHTML = --time + "s"
    // console.log("cs");
    if (time == 0) {
      console.log("时间到了");
      clearInterval(Number(timmer.value))
      timmer.value = null;
      console.log(timmer.value);
      domyzm.value!.innerHTML = "获取验证码"
    }
  }
  tim()
  timmer.value = setInterval(tim, 1000)
}
// 注册账号手机号
const submitPhone = async () => {
  // admin.value, password.value
  if (admin.value == '' && password.value == '') {
    ElMessage.warning("请输入手机号和验证码")
  }
  const res = await saveAdmin(admin.value, password.value)
  if (res.msg == SUCCESS) {
    ElMessage.success("注册成功")
    login();
  } else {
    ElMessage.warning("注册失败")
  }
}

defineExpose({
  close,
  open
})
</script>

<template>
  <div class="mask">
    <div class="logins">
      <div class="loginstop">
        <div class="loginsle">
          <div>
            扫描二维码登录
          </div>
          <div class="loginslewm">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAELdJREFUeF7tnetWrUgMhPX9H/rM2uJ2ASb5KmlQR2v+zWnoS1KpVAIbX19eXv69XPDfv3+fp3l9ff2YWR3f3xNtaz/P89ro3x73VmtGY/v1sn3Qfc85OmevzpnNE5092j/tN5qfzk4+6sDpgRADMLAYOYGMbACShbbxDwBSpETTkZEVRnleo7IVrRkBJ2PIaG26X2U4zfzHq4hZJuxPc+538Jyfgo98QGff328AnlK1AfjyYgC+h9CKxosi+43yd7rUDHjkqh/DgETb0UapyCBaViWAujdab5pGqvXpDMQsJHOyoKpkwSTgMttVfu/4BVOwOhk5keYhg3YcUmlJmoeAo2pZmscAfC88dlko1IAEHJUBO46ndBvNRaw7KWyIOZWi6XENFT5q8FGQZ/utmE/171my/O8Y0AD8HPFqIFVpVQkSAzCxUhbRZsDYYGbAwC4TKlYrrDtYc6LNOimUGEmVClQwkG267HpOser9UVBM0/rlGpCENo2TkTvNWLUwIceTcQ3AvHcY+eDWKpgARuMG4NECE/ZWC5wfy4AU0apAJqqepCZKjTSnmmb216k6rMOUBCzyAbE23V8FOu1NtYdSod/6KM4AzGFATiYA/ToA0oFpnHqDVOWqhU1HA3rOoza7w0eECxq//HWsaZvFYLkfLAZg8YTAAPyjAPy3KkZOHLvKgJMqeFL1dYoZVXRThU/jUeGTuYc0YKcgOrdKOvukFEvjrwZg7xWtKl7JcTRuAL5bgKIrasN8R3uDWi40TtG5Mk5rqwxMGSVj/6roo6Q3WVPNEmebhgxoAK5Ab7vXANRsaABqdmpfZQBqJisBSFTd0Syd4uKc4if7IBaaznkW7I//VzOG5pLjVaQbO6lvdZ+TwoakmQEooIIcR+PCEuklBqBovUj00q0UvT9xTjMgeZXHDwWY+sN0qtoix0QpOtvepL1BR1XTLAWCeg7q2dF+iEnp2XpUEXfSJj0pOUujaL2zJMEzG4DxE4gM3JVDDcDNaq2AfjaiO5GipiGKSIyO919P0XUdsKhRnrFeVd1mWaJTEZ/PQs7saEQsCAJ7d1iXMlI0/lGEGIC5+VQQGIB9CBqASdPYDJin0wlZpVnqqQE7aULdQGfOkJ7FlEBFwmQf6hkfa0dpnbiA9qSmSyoEOuvceY4sO5RvRHeeCZLBogqKtF31PHPveANws0DkZAPwhEzSUxGYptoqKpbUQDADEod/Bn1k28gHe9vKDJhRfbWoyoqP66oeGDGxyqSaSXPDXrlPqi7pTBRIVROf7Em+vjLjGIAJKqmnFzmJHEtM3skOvwaA1QupZFCKFOrsUyQRg6qP6sixlG5XtRWlIZXtyF40D9lL9deqvQ4p2ACc/aq/I+4NwPxrYeUr+WbAa6pLA7AAYNQHVKmaUhNRuirEKYVmxQW1cSjFqwWW+niPUpe6HzpvJo1Uv9L9Hf0b7RWrYHWjBuCRISlQDMDNXiEAO9FXGXK10iMnUkRNhDgxNbVvCFjEkBVTq+fJ9jghCTpv5mO6L5Qi1etYnVaEqnMIYDRuAB4toIJ/zzyXAij4qwMExMP6BuD6bzpUEFBRR2xFwUdZbKKJ1TkJdKmunLwPWLUgJqzZ2Xx2kKhgqFJfBho15RGL3AGmztkr4NDZ1YBSWJXaVaPXsQxA/gq+AXgs0PYBETaiCfVq9JkBPxueugoRe1NWIGb53zBg9T4gGYH6eBFoif47a9K1UQomTbOisyiIKb3TeSZ7m8yZ3TPZP9nk8i+kEsBonAxGB+qA/nktGZbWvArodPZfCcDoWTD1xSYphVJG5cSJ4KconlSkjznpHBWI6BwUPHT/aiCpARnpuWxv2AM1APlNYupNEkNGjqV70HHwVz9X2JKAbACerEvMMGEWiuisqjMDNr/0OilC7nwUN4ncCVgoyomhCNQ0Tus/759qZtVHZO9JO4m07KENYwDG5jIAN7sYgMnvRSKGefybqteIgQzALwJgVYR0UluHyqP0MmllULVerUMabrWh3gG4evbIxh0fUVB19lxVzJ115O8DErMYgEcLdJxpACapi0BH41SuT0BLApfWnLCmyjwEuox1q/tabCK+GtXZ5+0+it6GoR6UmtoIDLcfDj7tcVkaGXzFSw1eA/DdS/QEgKLqqqcnZsA81RNYq4Cb2PVcJXfm+CCxlY8TXdkArjZPvTDV8HuDdR7FkWEnaZ0CNsoy+32QbqTxCIxkRyKhyk4ZVuQvI1A/SN28mnqoSs3ARGAheaEyNe2PnGUAbhYs/1rmhOEmQptAo4L77UA7IU4goOKCNKoa8TSPWoQQCVxpR2Lg81odrBwwov4mpAOCaPNqxJOzCDQGYA7DVR+qAUfrGICFJSlQVON25vnTDKj+KInoP9JOV7ERFSGUeiJZQE8QOmtSETIZpzPdUWSo2WWabsPsZgDy60N7w6m6kpxE4wbgyQJmwM0gBiD/IpCC55CRJp9n61ZImeM6qfF5rRoI+zVJt6mg6hiW5iSNSGuttItW2VdN1ZkPDusbgDqrESg6qdoA3Kwl/71g1bgdw5I4J4fT/TR+B5OvzEn7vaqoI7tm49X+aG/pnOqPkgzAXAOG1Z34ZgpJBarWIxmTObtDDuqZ6MkSgd0MKLxxTcGnOouA8ScZMHoSQgKaUB0VDOo9UURT5E56dsQsVLjQeTrFUmQv6qt21qdrq/GJHajIOYwbgL0+oOpMA/C9yIDfL4cvI5gB+cv5BEQDUARg9UZ0JnAnzy7JYas6qpqfwEB7Uys8SleU9icFRbY32kt0Znq8t+L3bD/h9wGJAVc2Qs7uOEGdywDULPUtAJxowKr0pohsCdTBbzqi9YnBJtXnZB0NBlrqes7VYbpJy0Q956QQfJxhpAENQC5cqHInMFJQGIDNn3KqbQVKl+QYNWIp1ZNem6xDoOvs6dcBkCKW0lhkkA6YKt2Z7U0FI+2DHL8fV/VvB2x3nF3t7ZFtJn6P7JVKM/XjRJONrB4uYk0Ci7pmB9QG4GaBSfCR7hx9mkON7g6rPudUAZQZhFJj1X7IztUR+qptrgI1BdLEnqvn7fjdAITIfqvUGi8WGIA1U57taQAagB8xQ31ANbhaDKh+GYFSF1W5dLhJa0ctfFTDZWlRLXaydaoiYy8lVtf5Dh9V0onO9saGBmAMm0nD3ADcLNDR4QZgghoD8LNhqizW6ZvuZy4/zUGVWgfpVI6raZLaQWoaI51yMBK9UvSNjww7smE1XVb3EwDTDkP1aQ4D8HNKmThh4njSjare61xHOn1ydgr0JQYk1pq0L6hvFTETHvKLPlg03UfF2p2H/KptJlmE9G36pIOyxwoDGoBHhjQAN3u09LMByI1mFVjqdR0n/XoGrH6YTkK8oy9UHaSmkWxvFH0r+yDGnxQE09RGe1HTOmlNkkRq0ZcWIQbg+kctJ4FIAFrtGhiAyTPUTrlOb8M8ndgRwGbAXsDdzoDqK/lqapxUvsQGWWqj+yg9RPer91APdKIHac7IDlONWJ29QxJEAtH4AUsG4NEVBmBexVZBNW3tyB8pX2GLx72UTifMSY3TqwymFjarBQWBn2zUYd0qe9A8VJy2Chv1I+UG4GYBAkFVkExYogN+Ao66d5rHAHy3gBnwCHcCzo8E4NWfZ5umIbVtMC1IzvsiZ3SYhyrrq8Yrdj2zs9rGobSvFp9UEGbjl3+ezQDMUzWBmsb/DABVNE9YhEr81Tlp71ExRGuqrNtpiagtl2lanTBgp3g4t1eyfWLxqT4JUYuQzFnkeNJzVRojJ1EaMQA3CxmAQpVJnXkz4BFMncr7WwCo/iZEZRliE5qncz9dO2mJEFNHTHxOR2c2oX2S46s1U3Ff/BFtAmWUMYghSb9m4/JvQgg4kRNINF+V1on1IlmQOcEAPFqTwDqx135OAzB5gbIT0WbA5kuou7ekL/th+koRkdF7h9kqEFAUExNTilw9uyoViMkp42BFKv64Kis0K39lMsQATKxGoFXbKJmzVF1IrR11nsc+fiQA1WfB5BCVre42WCSgVf2aiW86GzEgjauFjbqPPdiINTtSg3ynMvlhTQMwdmvH2AQwGjcAk9CipxYUkaSt7tAsZsDNAlEA0dOR6p5sTsIArln9wWpKXR0dREK+YoHskKrBOs3rlbbCxF7Tsz3v67STCCxXaUTV12+gNgCPbjEA8+/7TWwTBcohSxmABuAZJJ0XCygLjQBIorlDsSsCW01pVMlFlSClPnXtxzxkL5IXE2a54x7SaxWYqF5IpUL1p7qoBxUJ/syxV4GWigyqXlVgqdcZgJtHbgHgBGAEWhpXhfL50CTKKRWc150aNNr/irjvsHvE9JQiryokO2kbNeAKWxHAaNwA3CygpljKOAbgu4VIJ1HKmzDcJJAivUYsQXs3AxaVdfQ+IEVNxVKkwYjhCDSTcdKNtCeSIiTeJzaZnDMT+qq/iCQ6dqquPcgKA7Bn1queMNCqfwaAkyo4Mh6xABmc0lRVRFxZMFCxorKEmpajwiGz1UpmukJXRvKE7EWSpvyD1Z3UYQAeYWMA5vbY48oATOiGqnUKTgNQBODkdayKijPB/lWpS61Y7wYYSY5onIqIzjilPrlICD7wPgm+7B7561gT/UFgqLTkVAfRmhQINK4GnwF4tIAB+G4PAhiNG4D8hTCq4A9ZcvJxIpW5VDbK0jY5m54WVGCiR0dUnVI67DDgSnYhrUm2JV+u7O0xNxWno48T0aaj0pw2UpXzBJZOG0YFtQG4WeB2AE6KkCrqSNxPihQCYIdtKHjUfmRnTZrzO5vbV51jmhFGRYgB2HGb/nPIiHUzx1IlSoHWO8GRDUnjtWSBGTB+l61jRHKmGTC30NIfK+zog0nBQCBYmXPCIAS0znikW+m8NP8kDZIP77BT+DICHY5oVxX3nYKBHGIAHr1mACYfOdxXUwbgBhoz4LuuXPlCasSaRNnEasTEq+OrKUctwLJAizJFpRGJ1ajr0DkvZTn17FRMHTohBiB/WiwyKAWfAXhk+tGjuA7bUKNZrQRXGZIinoBDZ67OSWxEcx+Y4aJPpUUMSq2diUyisxuAhfdJNlBKqR75nfWeCkIqsKJ51BRqAAbWI4bsOk5Nm/sCSVnDDBj/uddlBpykPhLIUUrJgDFJnQpgzteoQCeDUiqfaECVafdB03lMqcqkzK4rRUg2Z/mNaHKwAXi0EKW2SfDRnL8SgKSJKJKehiZWI4H8nKcjijssUrEYMRgFJ2UUCl7yQWQbKmJoz+qaNA+d/bBP9WeZE8cagLmrDMDNNmEKpkgwAxIH5F8CiLIDVa/VapSCW2y0+/0HnzC/orXm1QzYEe/EkOSsSUFBzqbxShYQGCZOJSlA8iRKy5kWraTT9B6y5+UMaAB+hhllFJXhKGAnaZ0AEu2tcw9dawCeXjsng5kB+a9qdtjyywA4ST9q9HXmJhZR0z6tSamT7q+AnjmYmJaCi7Q9zR/tGe35VRpQNThd1xG40VwG4NEq1AqbBJIK9LQKJhAQqisxSwAiHaPuLRPfnfUrBlbZgNLRmxOK6pP2e2WRQcAZMVzxZ2MNwABhBKwoTalBMamSDcDCusRWarqbspXqeNonsUjEYgTUjn41A6qeLK6jSKWeneqECZgmOoaEvpquOqZVbbia1u/Y09TG8q/iaNOq8VbTkAF49MTEnuRLBeBnnW8AFnpuapxIdFdMPknLE2cr96zupSo4IskytfF/BZOn1srrWKYAAAAASUVORK5CYII="
              alt="二维码">
          </div>
          <div class="loginslems">
            <div style="width: 54%;">
              <div>
                &nbsp;&nbsp;请使用小兔子<span style="color:cornflowerblue;">客户端</span>
              </div>
              <div>
                登录扫码登录或扫码下载App
              </div>
            </div>
          </div>
        </div>
        <div class="loginsri">
          <div>
            <div>
              <span :class="[toge == true && 'activecol']" @click="toge = true">密码登录</span>
              <span>|</span>
              <span :class="[toge == false && 'activecol']" @click="toge = false">短信登录</span>
            </div>
          </div>
          <div class="loginsrilb">
            <div v-show="toge">
              <div class="riadm">
                <div class="riadmt">
                  <div>账号</div>
                  <div>
                    <input type="text" style="height: 35px" v-model="admin" placeholder="请输入账号" />
                  </div>
                </div>
              </div>
              <div class="riadm">
                <div class="riadmb">
                  <div>密码</div>
                  <div>
                    <!--                  <el-input style="width: 365px; height: 100%" v-model="input" placeholder="Please input" />-->
                    <input :type="typeAndP.type" style="height: 35px" v-model="password" placeholder="请输入密码" />
                    <div class="eye">
                      <i :class="['bi', typeAndP.img]" @click="togeAnds"></i>
                      <span>忘记密码？</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="logsub">
                <el-button style="width: 205px;height: 35px;" @click="toge = false">注册</el-button>
                <el-button style="width: 205px;height: 35px;" type="primary" @click="login">登录</el-button>
              </div>
            </div>
            <div v-show="!toge">
              <div class="riadm">
                <div class="riadmt">
                  <div>+86</div>
                  <div>
                    <input style="height: 35px" v-model="admin" maxlength="10" placeholder="请输入手机号" />
                    <div class="yzm" ref="domyzm" @click="getverification">
                      获取验证码
                    </div>
                  </div>
                </div>
              </div>
              <div class="riadm">
                <div class="riadmb">
                  <div>验证码</div>
                  <div>
                    <!--                  <el-input style="width: 365px; height: 100%" v-model="input" placeholder="Please input" />-->
                    <input style="height: 35px" v-model="password" placeholder="请输入验证码" />

                  </div>
                </div>
              </div>
              <div class="logsub">
                <el-button type="primary" style="width:200px; height: 35px;" @click="submitPhone">登录/注册</el-button>
              </div>
            </div>
            <div class="logsub">
              <span style="font-size: 14px;color: gray">其他方式登录</span>
            </div>
            <div class="logsubtoge">
              <div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAABXu0BYt0BQt0BXu0BWu0BXu0BXu0BXu0BWukBWukBXvEBXu0BXvEBXvEBYukBVukBXu0BWt0BXukBXuEBXu0D////1+/Pq9+fV7s/A5rer3aBsw1jg89uBzHBiwEy14auL0Xug2ZOW1YeBzG93yGSW1YjL6sO14azL6cN2yGP3XpzOAAAAFXRSTlMA3yAQ78+/r5+AUI9w74BgYEBAkHDBb56KAAACF0lEQVRIx52W6XKDIBRGwT3GZmsRUXFP0vb9H7AKGS8aiCXnR0TCmU/gOoh0uJck8jEZwUGYXND/cOPggyz4CE//0HZgKeDIsdSA3Qs1Bk2XejLF7ckGe1fnOT7ZBDsaDxNiZ4Jna4Jnb7rgbeKrK7QnFuzBOxIrYrsJAth9iIdl/9CwLE0pv/elqfoegWpfXdAUYINW9GRkRIBWakBemiOVGRbpE1lpijwaPDANCxvCc8qBbcVF47vq5EQ1YjCK3nyXiXE3QqrpSseeu+jptc96XgWmHSGDEGtCmDHygpK5nUuRdr2MvvfNdMvzXCN+KVNk6RO0qOpr37fXJzFCwdzmT9532THZovmqFHxlF3/WcdWQGUsBI2g3K/G3WG3o4oEVsVqOK4RHaTpfaKkXCVsWzPTL65pPN7X4kxnEX6qIXS4mJqfOH5tVKSJWzJsiXqlcklxe5AI0yuL4RDUpiKkGphRrRFRK+lLk88AQSg4KXVC9TvwSRQ4MU5m1xZ2xlmnEm1LkrqeKTVbU5rcaNtJDCAWqCOutq90CpjiKMTFQZuuah/9Oo+h6ZtPkYTSxI0YKReWLtxFBpJ5bzjOasWYsoBp6HQSRW5R5tz4C4HS0PltjO/H05sH6iQDXtz0d3/94ANPes/9Asjd9572PwE8X6Tm+DPViZMQ5mLUDxGnVCFtqwDH0VlYQS22bcxIGIhn7UXLWWn+10s6FZo+4YQAAAABJRU5ErkJggg=="
                  alt="无法显示">
                微信登录
              </div>
              <div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEUAAADXQDjTQDzaQzfcRTfbRDfcRDbcQzbbRDbbRDfcQzbaQzbbRDbbRDbaRDfcQzbbRDfaQjjaQjXcQzfYRDfbRDTbRDf////gW1D99PPtoZvyubT76Ob20M3pioLdT0Tvrajkc2n20c3rlo7mfnb0xcD43NrrlY7kcmniZ1343driZ1z0xMEgvW1iAAAAFnRSTlMAIBDf34Dv78+/n1BAj7CvcGBgkHBwDUc+aAAAAmpJREFUSMeVlueCqjAQRgOI0qy7m0YVsN297/98OwEdCUQ05w8WDt/MkIjEhJv8RIFHAS/c/CTkM9w4XFKN5ebwgeaDNWURObYa4s+oMWrG1MOruDV9w9o1eU5A37JwDN6CUksTPWsTPXvTRe89wXBCa2rB+ukd6By3K6ca8WcNVoyxLB26i0ex/mxgzRTiMlx990A6C09PZ6XKwXbpIyP6Fn4C8zKONHVYFrJ4tJWfoUMJ5k2PPBi0igHZrX8j4HVLITPXB7udeK1gHem9ziJjouTwQYmnhCCuxh5UhSJO9qKmWwxrTcZeyh5UpcyFyOH0Bi5SaYNNyG7qYeK95CttWUWlJn6PW5RsSgVtlyqxoEhEQs1rNEPrldf5cI8Qb+hxYRKlaVsSY4NZKqU81aynpQY0kTNF3pS4fsDFvTESx4Gi0b4vMqWKdl4UcHWukmSeZXnRV9Gb5VgcDucIJ3B11JbckSmKyXAC7V7I52hxI2WmyYYk0m7+Dbd8JR7boTYlbshOE9WBsYb+MglBZ6r4p8TxXL+Hi7zov2dCnY1N8v7ViIS4z21V9q3U7Ap9YkzOulnrLAkZLtYTA4f+CpYLHEjFgCMdtwhiTBGedT+D/NwtIHU2V3li4tE9iO5qaILQwvF4LNUtTLsr8InnTX6Pebfq8qopmup/V29W0CkRIaNISDmxJwLqNeEYHwG8repzltVpA/Ua8UmP61ErPHy2xnbiniBflg9WxA0sCnXJAMezadDSRM/aRM/eDMCb4n7Z/glE9rOhq5i8xPFfaz7GmdXIs9aw4O1qZIUxam9IdtuwS/aCaJcYrT+uh9kYccQkXQAAAABJRU5ErkJggg=="
                  alt="">
                微博登录
              </div>
              <div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEUAAABMouVIn+NEn99MouVMouVMo+ZMouVKouRKouJMn+NMouZLouRLo+VMoeNMouZLoeVLoeVNn+RMouX///+83Pal0PL0+v6x1vRireiay/FXqOfS6Pl5uevH4vePxe+Ev+1utOrp9Pzp8/yEv+7XzqLPAAAAE3RSTlMA3yAQ74C/n2BQQK9wz5CPz7BwJ8NfpgAAAbNJREFUSMe1lutygjAQhTeEOyi2AQIC3t//GcvYqk3OYsh0+v1yMN+czc4mQBwyL5ONUDMiLsqc1iGzOFQGYZGu0KLZQkQSrNSQ6I2aGRqkpktxlXJQSc4LNsqJCBhPOCQwwXOa6PmbErxlNpJeVMqD6uWliqOfprPiyN5tcOp0PaObntnmo9hIAV39pFNA9BOogKb+RQN/h9+RCfzR1gbtQqSArtQmemAjUy4QI7GxBTy92qKGJfEshlgp0DO15srmhuIRFuX0Cc/2KO5hUUkF1xt3dxKKuUS3uCPBjA0w4rySwqYyDLCM+EqxVrd45UTtFm81ywlEuzkHXhyhOfY1DArfntg+jRMY/PB80CeODaLhHigpt7fYNSgeuvpgD7k0j9V4Gfbc6RjN7oRE1rCeejVo27vMD4/WFokynB33qUpnUYb+t5zg7+OhNYrVxx5PIzGRJ9ijniwxIC7y3DV3urZ9/DrDfQxvR793a+YnpvRk6+Nt6YXceRQq//rxgKb/h87/fVrtAmKQW2c/JfGkb0PDjBYJomUtMuJQTcRKDUmL0LLiDDWevCzie7LYJGXOWl/BnLhvbq/sWgAAAABJRU5ErkJggg=="
                  alt="">
                QQ登录
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loginends">
        <div>未注册小兔子的手机号，我们将自动帮你注册账号</div>
        <div>或登录完成立即代表同意<span style="color: cornflowerblue">用户协议</span>和<span style="color: cornflowerblue">隐私政策</span>
        </div>
      </div>
      <img class="leftlogin" src="https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png">
      <img class="rightlogin" src="https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png"
        alt="">
      <div class="xx" @click="close">×</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  opacity: 0;

  //transition: 1s;
  .logins {
    width: 850px;
    height: 430px;
    //border: 1px solid red;
    background: white;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    flex: none;

    .loginstop {
      display: flex;
      justify-content: space-between;
      height: 340px;

      >div {
        border: 0px solid red;
      }

      .loginsle {
        width: 300px;

        >div:first-child {
          display: flex;
          justify-content: center;
          align-items: end;
          height: 65px;
          border: 0px solid purple;
        }

        .loginslewm {
          border: 0px solid purple;
          display: flex;
          justify-content: center;

          img {
            width: 160px;
            margin: 22px 0;
            border: 1px solid #b4b4b4;
            padding: 5px;
            border-radius: 5px;
          }
        }

        .loginslems {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border: 0px solid red;
          font-size: 12px;
        }
      }

      .loginsri {
        width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        >div:first-child {
          display: flex;
          justify-content: center;
          align-items: end;
          //margin: 20px 0;
          border: 0px solid purple;
          height: 100px;
          margin-bottom: 10px;

          div {
            display: flex;
            justify-content: center;
            align-content: center;

            span {
              margin: 10px;
            }

            span:nth-child(2) {
              color: #d9d8d8;
            }
          }

        }

        .loginsrilb {
          border: 0px solid purple;
          height: 100%;
          border-left: 1px solid #d9d8d8;

          .riadm {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0px solid blue;
            position: relative;

            //height: 50px;
            //padding: 10px;
            .riadmt {
              border-radius: 5px 5px 0 0;
              border-bottom: 0;
              position: relative;

              .yzm {
                position: absolute;
                right: 0;
                top: 0;
                border-left: 1px solid #c7c7c7;
                height: 100%;
                padding: 0 20px;
                display: flex;
                align-items: center;
                color: #68b4ff;
                font-weight: bold;
                cursor: pointer;
              }
            }

            .riadmb {
              border-radius: 0 0 5px 5px;
            }

            .riadmt,
            .riadmb {
              font-size: 13px;
              height: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;

              div:first-child {
                border: 0px solid red;
                width: 60px;
                height: 100%;
                display: flex;
                justify-content: start;
                margin: 0 10px;
                padding: 0 10px;
              }

              >div:last-child {
                border: 0px solid red;
                width: 330px;
                position: relative;

                .eye {
                  position: absolute;
                  right: 10px;
                  bottom: 2px;
                  display: flex;
                  align-items: center;

                  i {
                    font-size: 20px;
                  }

                  span {
                    color: #409eff;
                    margin: 0 5px;
                  }
                }
              }
            }

            >div {
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #d5d5d5;
              padding: 5px;
              width: 420px;
            }
          }

          .logsub {
            display: flex;
            justify-content: center;
            margin: 20px 0;
          }

          .logsubtoge {
            display: flex;
            justify-content: center;
            align-content: center;
            color: gray;
            font-size: 14px;

            img {
              width: 28px;
            }

            div {
              margin: 0 22px;
              cursor: pointer;
            }
          }
        }

      }
    }

    .loginends {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border: 0px solid red;
      font-size: 13px;
      margin-top: 20px;
    }

    .leftlogin {
      position: absolute;
      left: -60px;
      bottom: -55px;
      transform: scale(0.5);
    }

    .rightlogin {
      position: absolute;
      right: -65px;
      bottom: -52px;
      transform: scale(0.5);
    }

    .xx {
      position: absolute;
      right: 20px;
      top: 0;
      //z-index: 5;
      color: black;
      font-size: 40px;
      cursor: pointer;
    }
  }
}

input {
  border: none;
  outline: none;
}

input::placeholder {
  color: #989797;
}

.activecol {
  color: #409eff;
}

span:hover {
  cursor: pointer;
}
</style>
