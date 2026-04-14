import  Home  from "./pages/Home";
import  About from "./pages/About";  
import  Pictures from "./pages/Pictures";  
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";


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
        path: "/signup",
        component: Signup
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