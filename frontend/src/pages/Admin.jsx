import React, { useState, useEffect } from "react";
import { getAdmin} from "../api/auth";


export default function Admin() {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        getAdmin()
            .then((res) => setAdminData(res.data))
            .catch((err) => console.error(err));
    }, []);
    if (adminData) {
        return (
            <div>
                <h1>Admin Page</h1>
                <pre>{JSON.stringify(adminData, null, 2)}</pre>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}