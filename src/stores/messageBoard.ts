import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageBoardStore = defineStore('MessageBoard', () => {
    const MessageBoardId = ref<Number>(1)
    const setMessageBoardId = (id:Number) => {
        MessageBoardId.value = id
    }
    return { MessageBoardId, setMessageBoardId }
}, {
    persist: true
})
