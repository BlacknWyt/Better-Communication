import './App.css';
import Auth from './components/Auth.js';
import Chat from './components/Chat.js';
import {auth} from './firebase.js';
import {signOut} from 'firebase/auth';

import {useState} from 'react'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function App() {
  const [isAuth, setAuth] = useState(cookies.get("auth-token"));

  const [room, setRoom] = useState(null);
  const [roomRef, setRoomRef] = useState(null);

  if(isAuth === undefined) {
    return (
      <Auth setAuth={setAuth}/>
    )
  }

  const signOutUser = async() => {
    await signOut(auth);
    cookies.remove("auth-token");
    setAuth(false);
    setRoom(null);
    window.location.reload(false);
  }

  return(
    <>
      {
        (!room)?
        <div className='room'>
          <h1>Enter room</h1><br/>
          <input onChange={(e) => setRoomRef(e.currentTarget.value)} value={room} placeholder='e.g Joes room'/>
          <button onClick={() => setRoom(roomRef)}>enter</button>
        </div>
        :
        <div>
          <Chat room={room}/>
        </div> 
      }
      <div style={{textAlign:'center', paddingTop:'10px', paddingBottom:'10px'}}>
        <button onClick={signOutUser}>SignOut</button>
      </div>
    </>
  )
}

export default App;
