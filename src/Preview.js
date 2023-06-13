import React, { useEffect } from 'react'
import './Preview.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectCameraImage, resetCameraImage } from './features/cameraSlice'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from "uuid"
import {storage, db} from  './Firebase'
import firebase from 'firebase/compat/app';
import { selectUser } from "./features/appSlice";



function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const history = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!cameraImage) {
           history("/"); 
        }
    }, [cameraImage, history]);

    const closePreview = () =>{
        dispatch(resetCameraImage());
    };

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage
        .ref(`posts/${id}`)
        .putString(cameraImage, "data_url");

        uploadTask.on(
            "state_changed",
            null,
            (error) => {
                console.log(error);
            },
            () => {
                //complete
                storage
                .ref("posts")
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection('posts').add({
                        imageUrl: url,
                        username: 'PAPA React',
                        read: false,
                        profilePic: user.profilePic,
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    history('/chats') 
                })
            }
        );
    }

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      
      <p className='preview__toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </p>
      <img src={cameraImage} alt="" />
      <p className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon onClick={sendPost} fontSize="small" className="preview__sendIcon" />
      </p>
    </div> 
  )
}

export default Preview;
