import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import useAuthentication from "./effects/Auth/useAuthentication";
import {Container} from "react-bootstrap";
import Department from "./views/Department/Department";
import Employee from "./views/Employee/Employee";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import AppNav from "./components/AppNav/AppNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentHighEarning from "./views/DepartmentHighEarning/DepartmentHighEarning";


export default function App() {
    const {isAuth} = useAuthentication();

    return (
        <Container>
            <AppNav/>
            <Switch>
                <Route path="/departments/high-earning">
                    <DepartmentHighEarning/>
                </Route>
                <Route path="/department/:departmentId">
                    <Employee/>
                </Route>
                <Route path="/departments">
                    <Department/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                            isAuth ?
                                <Redirect to="/departments"/> :
                                <Redirect to="/login"/>
                        );
                    }}
                />
            </Switch>
        </Container>
    );
}