import { createApp } from "vue";

/* STYLES */
import "@/app/assets/styles/style.scss";

/* MAIN COMPONENT */
import App from "./App.vue";

/* PLUGINS */
import pinia from "./pinia";

createApp(App).use(pinia).mount("#app");
