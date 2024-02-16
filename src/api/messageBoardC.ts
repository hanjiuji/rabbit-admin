import http from "../utils/http.js";


// 查询留言板评论
export const getMessageBoardC = (id:Number) => {
    return http.get(`/messageBoardB/${id}`);
}
// 新增留言板评论
export const saveMessageBoardC = (obj:Object) => {
    return http.post("/messageBoardB/saveMessageBoardC",obj);
}