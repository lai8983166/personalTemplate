import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import * as Icons from "@element-plus/icons-vue";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
Object.entries(Icons).forEach(([name, comp]) => {
  app.component(name, comp);
});
app.mount("#app");
