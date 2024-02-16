import http from "../utils/http.js";

//获取分类评论
export const getArticleReview = (params:Object) => {
    return http.get("/Review/getReviewList", { params });
}
// 新增分类
export const saveArticleReview = (obj:Object) => {
    return http.post("/Review/saveReview", obj);
}