import { Navbar, Container, Nav } from 'react-bootstrap'
import './Navigation.css'

function Navigation() {
    return (
        <>
            <Navbar className="navigation" expand="lg" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/addList">Add list</Nav.Link>
                            <Nav.Link href="/addVideo">Add video</Nav.Link>                                
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;