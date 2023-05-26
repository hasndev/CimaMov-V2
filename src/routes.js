import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "Details",
        path: "/details/:id",
        component: Details,
        props: true,
    },
]

export default routes;