import  Home  from "./pages/Home";
import  About from "./pages/About";  
import  Pictures from "./pages/Pictures";  


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
        path: "/pictures",
        component: Pictures 
    }]
    export default routes;