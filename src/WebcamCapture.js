import React,{useRef, useCallback}  from 'react'
import { useDispatch } from "react-redux";
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom'
import './WebcamCapture.css'



const VideoConstraints = {
    width: 250,
    height : 400,
    facingMode: "user"
};

function WebcamCapture() {
 const webcamRef = useRef(null);
 const dispatch =  useDispatch();
 const History = useNavigate();


 let capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    History('/preview')

 }, [webcamRef])

  return (
    <div className='webcamCapture'>
      <Webcam
        audio={false}
        height={VideoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={VideoConstraints.width}
        videoConstraints={VideoConstraints}
      />

      <RadioButtonUncheckedIcon 
      className='webcamCapture__button'
      onClick={capture}
      fontSize="large"
      />
    
    </div>
  )  
}

export default WebcamCapture
