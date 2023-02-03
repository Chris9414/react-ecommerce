import { Offcanvas } from 'bootstrap';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PurchasesSidebar from './PurchasesSidebar';

const AppNavbar = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return (
        <div>
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Ecommerce</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto navbar-items-container">
                                <Nav.Link as={Link} to="/login" className='navbar-items'>Login</Nav.Link>
                                <Nav.Link as={Link} to="/Purchases" className='navbar-items'>Purchases</Nav.Link>
                                <Nav.Link onClick={handleShow} className='navbar-items'>Cart</Nav.Link>
                                <Nav.Link onClick={logout} className='navbar-items'>Log out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <PurchasesSidebar show={show} handleClose={handleClose}/>
            </>
        </div>
    );
};

export default AppNavbar;