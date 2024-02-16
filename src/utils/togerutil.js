

// 切换
let flag = true;
// 加锁
let lock = true;
// 设置锁
export const setLock = (val) => {
  lock = val;
}
// 点击切换页面颜色
export const toge = () => {
  console.log("点击")
  let ll = document.querySelector("#styll")
  console.log(ll);
  if (lock) {
    if (flag) {
      if (!ll) {
        let link = document.createElement('link');
        link.setAttribute('type', 'text/css');
        link.setAttribute('id', 'styll');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './assets/togers.css');
        document.head.appendChild(link);
        console.log("判断没有拿到ll添加togers");
        return
      }
      // "./src/components/togers.scss"
      ll.href = "./assets/togers.css";
      flag = false;
    } else {
      if (!ll) {
        let link = document.createElement('link');
        link.setAttribute('type', 'text/css');
        link.setAttribute('id', 'styll');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './assets/toger.css');
        document.head.appendChild(link);
        console.log("判断没有拿到ll");
        return
      }
      ll.href = "./assets/toger.css";
      flag = true;
    }
  }
}
