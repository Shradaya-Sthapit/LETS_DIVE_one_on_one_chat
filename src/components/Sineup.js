import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth,db } from "../firebaseAPI";
import { useStateValue } from "./StateProvider";



const SineUp = (props) => {
const history = useHistory();
const[{},dispatch]=useStateValue();
const signUp = (e) => {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((Auth) => {
      if(Auth){
        dispatch({
          type:'SET_USER',
          user: Auth
        })
      const currentUser = auth.currentUser;
      currentUser.updateProfile({
        displayName: firstname
      }).then(()=>{
        db.collection('users').add({
          firstName: firstname,
          lastName: lastname,
          email: email,
          uid: Auth.user.uid,
          isOnline: true
        }).then(()=>{
          localStorage.setItem('props',JSON.stringify(Auth));
        history.push('/Home');})
        
          
        })
        .catch(error =>{
          console.log(error);
        });
    
    }

    
        
      })
      .catch((error) => alert(error.message));
  };
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container className="p-5">
      <Row>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              type="string"
              value={firstname}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type="string"
              value={lastname}
              placeholder="Enter email"
            />
          </Form.Group>
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
            <Button onClick={signUp} variant="primary" type="submit">
              Sign Up
            </Button>
          </Col>
          <Link to="/Login">
          <Form.Text className="text-muted p-2">Already a member ? Login</Form.Text>
          </Link>  
        </Form>
      </Row>
    </Container>
  );
};

export default SineUp;