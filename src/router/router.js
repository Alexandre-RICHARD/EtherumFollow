// On importe les éléments utiles de Vue Router
import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@store/Main";

// On importe toutes les vues qui seront utilisées par notre router principal


// On liste toutes les routes qui seront gérées par le router principal
const routes = [
    
];

// On créé notre router en indiquand l'historique et le tableau des routes précédemment créées
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// On exporte notre router afin de le récupérer à la création de l'app
export default router;
