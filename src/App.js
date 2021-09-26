
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes';
import { useStateValue } from './components/StateProvider';
import { useEffect } from 'react';
import { auth } from './firebaseAPI';
function App() {
  const[{},dispatch] = useStateValue();
  // useEffect(()=> {
  //   auth.onAuthStateChanged(authUser => {
  //     console.log('The user is >>>>>', authUser)

  //     if(authUser){
  //       dispatch({
  //         type: 'SET_USER',
  //         user: authUser,
  //       })
  //     }
  //     else{
  //       dispatch({
  //         type: 'SET_USER',
  //         user: null
  //       })
  //     }
  //   })
  // },[])
  return (
    <div className="App">
 <BrowserRouter >   
<Routes />
</ BrowserRouter >
    </div>
  );
}

export default App;
