import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import keycloak from "../config/keycloak";

export default function Header() {
    // inside component
    const username = keycloak.tokenParsed?.preferred_username;
    const { user, logoutUser } = useContext(AuthContext);
    const [isLogin, setIsLogin] = React.useState(false);
    const onLogin = () => {
        setIsLogin(true);
    }
    
    return (
        <div className={"header" + (user ? " logged-in" : "")}>

            <h2>Family Cloud</h2>

            {user ? (
                <div>
                    <span>Welcome, {username }</span>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            ) : (
                <div>
                    <h4 className="clickable" onClick={onLogin}>Login</h4>
                    <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                </div>
            )}

        </div>
    );
}