import http from "../utils/http.js";

// 获取用户信息
export const getlogin = (account: String, password: String) => {
  return http.post("/admin/login", {
    account, password
  });
}
// 注册账户
export const saveAdmin = (account: String, password: String) => {
  return http.post("/admin/register", {
    account, password
  });
}


