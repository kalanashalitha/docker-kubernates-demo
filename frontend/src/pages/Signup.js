import axios from 'axios';
import { useContext, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import UserContext from '../components/UserContext';

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  if (user.name) {
    return <Redirect to="/" />;
  }

  const signup = async (event) => {
    event.preventDefault();
    const { email, name, password, confirmPassword } = event.target.elements;

    if (password.value !== confirmPassword.value) {
      setError('Password does not match!');
      return;
    }
 
    const userData = { email: email.value, name: name.value, password: password.value };

    try {
      // API call
      const res = await axios.post('http://localhost:8080/api/user/register', userData);
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
        <Card.Header as="h5">Create New Account</Card.Header>
        <Card.Body>
          <Form onSubmit={signup}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                {"We'll never share your email with anyone else."}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
              <Form.Text style={{ color: 'red ' }}>
                {error}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
        
    </div>
   );
};
 
export default Signup;