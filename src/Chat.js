import React from 'react'
import {Avatar} from '@material-ui/core'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import './Chat.css'
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage } from './features/appSlice'
import { useNavigate } from "react-router-dom";
import { db } from './Firebase'


function Chat({id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch()
    const history = useNavigate()

     const open = () => {
      if (!read) {
        dispatch(selectImage(imageUrl))
        db.collection("posts").doc(id).set(
          {
            read: true,
          },
          { merge: true }
        );

          history('/chats/view')
        
      }
     }  
    
 
    return (
    <div onClick={open} className='chat'>
      <Avatar className="chat__avatar" scr={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>{!read && "Tap to view -"}{" "} 
          <ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()} /> </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
     
    </div>
  )
}
 
export default Chat
