import React, { useState, useEffect, useContext } from "react";
import { getProtectedUser } from "../api/auth";
import UserMenu from "./UserMenu";
import { AuthContext } from "../context/AuthContext";


export default function Header() {
    // inside component
    const [userData, setUserData] = useState(null);
    const [usermenu, setUserMenu] = useState(false);
    const { logoutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser();
        setUserMenu(false);
    };


    useEffect(() => {
        getProtectedUser()
            .then((res) => setUserData(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className="header">

            <h2>Family Cloud</h2>

            {usermenu && <div className="menu-backdrop" onClick={() => setUserMenu(false)} />}


            <div className="header-user-area">
                <h4 onClick={() => setUserMenu(!usermenu)}>
                    welcome {userData && userData.username}
                </h4>
                <UserMenu isOpen={usermenu} onLogout={handleLogout} />
            </div>

        </div>
    );
}