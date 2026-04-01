import  Home  from "./pages/Home";
import  About from "./pages/About";  
import  Pictures from "./pages/Pictures";  
import Admin from "./pages/Admin";


const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/admin",
        component: Admin
    },
    {       
        path: "/pictures",
        component: Pictures 
    }]
    export default routes;