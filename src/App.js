import React, { useEffect } from 'react';    
import './App.css';
import WebcamCapture from './WebcamCapture'
import Preview from './Preview';
import Chats from './Chats'
import ChatView from './ChatView'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { login, logout, selectUser } from "./features/appSlice"
import { useDispatch, useSelector } from "react-redux"
import Login from './Login'
import {auth} from "./Firebase"


function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="App">
     <Router>
      {!user ? (
        <Login />
      ) : (

        <>
        <img className='app__logo' src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' alt='' />
        <div className="app__body">
          <Routes className="app__bodyBackground">
          
              <Route path="/" element={<WebcamCapture />} exact/>
              <Route path="/chats/view" element={<ChatView />} exact/>
              <Route path="/preview" element={<Preview />} />
              <Route path="/chats" element={<Chats />} />
          
          </Routes>
        </div>
        </>
      )} 
        
      </Router>
    </div>
  );
}

export default App;
