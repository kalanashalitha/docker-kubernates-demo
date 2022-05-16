import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserContext from './UserContext';

const Layout = ({ children }) => {
  const { setUser, user } = useContext(UserContext);

  const logout = () => {
    setUser({});
    // remove values from localstorage
    // window.localStorage.setItem('user', '');
  };

  return ( 

    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto" style={{ flex: 1 }}>
            <LinkContainer to="/">
              <Navbar.Brand>Profile</Navbar.Brand>
            </LinkContainer>
            {/* <LinkContainer to="/jobs">
              <Navbar.Brand>Jobs</Navbar.Brand>
            </LinkContainer> */}
            <LinkContainer to="/map">
              <Navbar.Brand>Map</Navbar.Brand>
            </LinkContainer>
            <div style={{ flex: 1 }} />

            {
              user.name ?
                <>
                  <h6 className="mt-1 navbar-brand" > Welcome {user.name} </h6>
                  <Navbar.Brand onClick={logout}>logout</Navbar.Brand>
                </>
            :
                <>
                  <LinkContainer to="/signup">
                    <Navbar.Brand>Signup</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Navbar.Brand>Login</Navbar.Brand>
                  </LinkContainer>

                </>
            }
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-5">
        {children}
      </Container>
    </div>
   );
};
 
export default Layout;