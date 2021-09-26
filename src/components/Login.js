import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth,db } from "../firebaseAPI";
import { useStateValue } from "./StateProvider";

const Login = (props) => {
const history = useHistory();
const[{},dispatch] = useStateValue();
const login = (e) => {
  e.preventDefault();

  auth
  .signInWithEmailAndPassword(email, password)
  .then((data) => {
   
  
        localStorage.setItem('props',JSON.stringify(data));
        dispatch({
          type:'SET_USER',
          user: data
        })
        history.push('/Home'); 
        
      })
      .catch(error =>{
        console.log(error);
      // });
      
    })
    .catch((error) => alert(error.message));
};
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container className="p-5">
      <Row>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Col className="p-2">
            <Button onClick={login} variant="primary" type="submit">
              Login
            </Button>
          </Col>
          <Link to="/">
          <Form.Text className="text-muted p-2">Want to be a member ? Signup</Form.Text>
          </Link>  
        </Form>
      </Row>
    </Container>
  );
};

export default Login;