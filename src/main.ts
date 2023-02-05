import { createApp } from "vue";
import { createPinia } from "pinia";
import urql from '@urql/vue';

import App from "./App.vue";
import router from "./router";
import "@/assets/main.css";
import "@/assets/fonts/space-mono-v12-latin/space-mono.css"
import "@/assets/fonts/unbounded-v3-latin/unbounded.css"
import "@/assets/fonts/montserrat-v25-latin/montserrat.css"

createApp(App)
  .use(createPinia())
  .use(router)
  .use(urql, {
    url: 'https://qtpycvkezcwprbllaxqo.supabase.co/graphql/v1',
    fetchOptions: {
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': "*"
      }
    }
  })
  .mount("#app")
