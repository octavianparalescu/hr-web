import React from 'react';
import useAuthentication from "../../effects/Auth/useAuthentication";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function AppNav() {
    const authStatus = useAuthentication();

    return <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">HR App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {authStatus.isAuth ?
                    <>
                        <Nav.Link as={Link} to="/departments">Departments</Nav.Link>
                        <Nav.Link as={Link} to="/departments/high-earning">Departments with 2 salaries over 50k</Nav.Link>
                    </>
                    :
                    <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>;
}

export default AppNav;