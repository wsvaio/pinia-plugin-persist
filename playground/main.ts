import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersist());
const app = createApp(App);
app.use(pinia);
app.mount("#app");
