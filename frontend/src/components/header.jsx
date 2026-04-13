import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import keycloak from "../config/keycloak";

export default function Header() {
    // inside component
    const username = keycloak.tokenParsed?.preferred_username;
    const { user, logoutUser } = useContext(AuthContext);
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
                </div>
            )}

        </div>
    );
}