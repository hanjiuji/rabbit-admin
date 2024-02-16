import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getArticleCategory } from "@/api/articleCategory"

export const useCategoryStore = defineStore('category', () => {
    type categorys = {
        id: Number,
        name: String
    }
    const categoryList = ref<categorys[]>()
    const getCategoryList = async () => {
        const res = await getArticleCategory()
        categoryList.value = res.data
    }
    return { getCategoryList, categoryList }
}, {
    persist: true
})
