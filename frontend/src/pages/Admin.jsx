import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUsers } from "../api/auth";


export default function Admin() {
    const users =getUsers();
    console.log(users);
    return (
        <table>
            <tbody>
                <tr>

                    <th>#</th>
                    <th></th>
                    <th>Title</th>
                    <th>◷</th>
                    <th></th>
                </tr>
            </tbody>
        </table>
    );
}