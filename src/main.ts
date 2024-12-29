import "@mdi/font/css/materialdesignicons.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./store/useUserStore";
import { getItem } from "./utils/storage/localStorage";

const app = createApp(App).use(router);
const pinia = createPinia();

const theme = getItem("theme");

app.use(pinia);

useUserStore().init();

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: theme ?? "dark",
    themes: {
      light: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          background: "#ffffff",
        },
      },
      dark: {
        colors: {
          primary: "#1E88E5",
          secondary: "#616161",
          background: "#121212",
        },
      },
    },
  },
});

app.use(vuetify);

app.mount("#app");
