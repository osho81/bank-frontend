import React from 'react';
import {Navbar, Container } from 'react-bootstrap';

function HeaderComponent(props) {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/" className="header-navbar">Bank Of Bravos</Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
            <br></br>
        </div>
    );
}

export default HeaderComponent;


// Compare class component:

/* import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class HeaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand href="/" className="header-navbar">Bank App</Navbar.Brand>
                        </Container>
                    </Navbar>
                </header>
                <br></br>
            </div>
        )
    }
}

export default HeaderComponent  */