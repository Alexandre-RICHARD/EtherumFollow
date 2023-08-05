// Fichier initial pour le le Javascript (ou plus exactement pour notre application vue ainsi que son store et son router)

// Importation de vue, pinia et de notre router créé ailleurs
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@router/router.js";

// On importe App qui sera le point d'entrée de l'application entière
import App from "@views/App.vue";

// On créé l'application App qui utilise Pinia et le router avant d'être rendu sur la div d'Id "App"
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
