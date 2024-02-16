import http from "../utils/http.js";

//获取文章详细
export const getArticle = (params:Object) => {
    return http.get("/article/getArticleList", { params });
}
//获取单个文章
export const getArticleOne = (id:Number) => {
    return http.get(`/article/getArticleOne/${id}`);
}
