import http from "../utils/http.js";

//获取标签详细
export const getlabel = () => {
    return http.get("/label/getLabelList");
}
