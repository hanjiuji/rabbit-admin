import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // 锁
  const lock = ref<Boolean>(true)
  // 修改锁
  const setLock = (value:Boolean) => { 
    lock.value=value
  }

  return { lock, setLock }
}, {
  persist: true
})
