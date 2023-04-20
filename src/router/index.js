import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "@/views/Register";
import PlayGame from "@/views/PlayGame.vue";
import NotFound from "@/views/NotFound";
import Unauthorized from "@/views/Unauthorized";
import leaderB from "@/views/LeaderB.vue";

const routes = [
    {
        path: "/home",
        component: Home
    },
    {
        name: "login",
        path: "/",
        component: Login
    },
    {
        name: "register",
        path: "/register",
        component: Register
    },
    {
        name: "play-game",
        path: "/play-game",
        component: PlayGame
    },
    {
        name: "leaderb",
        path: "/leaderb",
        component: leaderB
    },

    {
        name: "404",
        path: "/404",
        component: NotFound
    },
    {
        name: "401",
        path: "/401",
        component: Unauthorized
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
