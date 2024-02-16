import http from "../utils/http.js";

// 查询留言板（没有就新增）
export const getMessageBoard = (id:Number) => {
    return http.get(`/messageBoard/admin/${id}`);
}
// 修改留言板
export const putMessageBoard = (id:Number, content:String) => {
    return http.put("/messageBoard/putMessageBoard", {id,content});
}