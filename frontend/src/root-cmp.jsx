import React from 'react';
import { Route, Routes } from 'react-router'
import Header from "./components/header";
import routes from './routes.js'


export class RootCmp extends React.Component {
    render() {
        return (
            <main className="main">
                <Header>
                </Header>
                <Routes>
                    {routes.map(route => <Route key={route.path} element={<route.component />} path={route.path} />)}
                </Routes>
            </main>
        )
    }
}


