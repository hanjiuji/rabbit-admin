import http from "../utils/http.js";

//获取分类详细
export const getArticleCategory = () => {
  return http.get("/Category/getCatrgoryList");
}
