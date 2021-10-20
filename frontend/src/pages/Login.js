import { useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../components/UserContext';

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  if (user.name) {
    return <Redirect to="/" />;
   }

  const login = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const userData = { email: email.value, password: password.value };

    try {
      // API call
      const res = await axios.post('http://localhost:8080/api/user/login', userData);
      setUser(res.data);
      window.localStorage.setItem('user', JSON.stringify(res.data));
    } catch {
      setUser({});
      window.localStorage.setItem('user', JSON.stringify({}));
    }
  };

  return ( 
    <div>
      <Card>
        <Card.Header as="h5">Sign in to Portal</Card.Header>
        <Card.Body>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                {"We'll never share your email with anyone else."}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
        
    </div>
   );
};
 
export default Login;