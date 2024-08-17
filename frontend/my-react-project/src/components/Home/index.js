import React, { useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { styled } from '@mui/system';
import StopIcon from '@mui/icons-material/Stop';
const OuterGradientCircle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    background: 'radial-gradient(circle, red, darkred)',
});

const InnerWhiteCircle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    // background: 'radial - gradient(circle, blue, white)',
    backgroundColor: 'white',
});

const MicrophoneButton = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const mediaStreamRef = useRef(null);

    const handleMicClick = async () => {
        // if (!isRecording) {
        //     try {
        //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        //         mediaStreamRef.current = stream;
        //         mediaRecorderRef.current = new MediaRecorder(stream);

        //         mediaRecorderRef.current.ondataavailable = (event) => {
        //             audioChunksRef.current.push(event.data);
        //         };

        //         mediaRecorderRef.current.onstop = () => {
        //             const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        //             const audioUrl = URL.createObjectURL(audioBlob);
        //             const audio = new Audio(audioUrl);
        //             audio.play(); // Play the recorded audio after stopping
        //             audioChunksRef.current = []; // Clear the chunks for the next recording

        //             // Stop all tracks to release the microphone
        //             mediaStreamRef.current.getTracks().forEach(track => track.stop());
        //         };

        //         mediaRecorderRef.current.start();
        //         setIsRecording(true);
        //         setIsPaused(false);
        //     } catch (error) {
        //         console.error('Error accessing microphone:', error);
        //     }
        // } else {
        //     mediaRecorderRef.current.stop();
        //     setIsPaused(true);
        //     setIsRecording(false)
        // }

        if (!isRecording) {
            setIsRecording(true);
        }else{
            setIsRecording(false);
        }
    }
    return (
        <OuterGradientCircle>
            <InnerWhiteCircle onClick={() => handleMicClick()}>
                <IconButton>
                    {isRecording ? <StopIcon style={{ fontSize: 50, color: 'black' }} /> : <MicIcon style={{ fontSize: 50, color: 'black' }} />}
                </IconButton>
            </InnerWhiteCircle>
        </OuterGradientCircle>
    );
};

export default MicrophoneButton;
