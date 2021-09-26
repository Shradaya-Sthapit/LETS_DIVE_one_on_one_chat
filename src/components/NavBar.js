import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useStateValue } from "./StateProvider";
import { auth,db } from "../firebaseAPI";
import { useHistory } from "react-router";
const Nav = () => {
  const [state, dispatch] = useStateValue();
  const history=useHistory();
  const userLocal= JSON.parse(localStorage.getItem('props'))
  const logout = (e) =>{
    e.preventDefault();
      db.collection('users')
        .get()
        .then((res) => {
            res.forEach((doc) => {
            if (doc.data().uid === userLocal.user.uid) { 
                db.collection('users')
                .doc(doc.id)
                .update({
                    isOnline: false
                })
            }
            });
        })     

    if(state.user){
      dispatch({
        type:'SET_USER',
        user: null
      })
        auth.signOut();
        localStorage.removeItem('props');
    }
}
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>LETS DIVE</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <p>Signed in as: {userLocal.user?.displayName}</p>
            </Navbar.Text>
          </Navbar.Collapse>
          
        </Container>
        <button onClick={logout}>Logout</button>
      </Navbar>
    </div>
  );
};

export default Nav;