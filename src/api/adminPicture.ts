import http from "../utils/http.js";

//获取用户的图片
export const getAdminPicture = (id:Number) => {
    return http.get(`/adminpic/adminPicAll/${id}`);
}