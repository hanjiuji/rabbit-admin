import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export * from "./counter"
export * from "./useAdminStore"
export * from "./categoryStore"
export * from "./messageBoard"
export * from "./counter"
export default pinia;
