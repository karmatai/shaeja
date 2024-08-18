import React, { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { LiveAudioVisualizer } from "react-audio-visualize";
import { styled } from '@mui/system';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch, useSelector } from 'react-redux';
import { setDoneRecording, setIsRecording, setResultData } from '../../redux/action';
import { getBrowser } from '../utils/getBrowser';

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

const AudioRecorder = () => {
    const dispatch = useDispatch();
    // const [isRecording, setIsRecording] = useState(false);
    const { isRecording } = useSelector((state) => state.app);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const mediaStreamRef = useRef(null);
    let mediaRecorder = useRef();
    const [tempAudioURL, setTempAudioURL] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const handleMicClick = async () => {
        // if (!isRecording) {
        //     
        // } else {
        //     setIsPaused(true);
        //     setIsRecording(false)
        // }

        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;
                mediaRecorderRef.current = new MediaRecorder(stream);

                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.play(); // Play the recorded audio after stopping
                    audioChunksRef.current = []; // Clear the chunks for the next recording

                    // Stop all tracks to release the microphone
                    mediaStreamRef.current.getTracks().forEach(track => track.stop());
                };

                mediaRecorderRef.current.start();
                dispatch(setIsRecording(true));
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        } else {
            mediaRecorderRef.current.stop();
            dispatch(setIsRecording(false));
            dispatch(setDoneRecording(true));
        }
    }
    let stopRecordingTimeout
    const toggleRecording = () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    };
    const getMicrophonePermission = async () => {
        let permissionStatus = await navigator?.permissions.query({
            name: "microphone",
        });
        if (permissionStatus.state === "prompt") {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    // Use the audio stream
                })
                .catch((error) => {
                    // Handle the error or guide the user to enable permissions
                });
            alert("Please provide the required permission from browser settings");
        } else if (permissionStatus.state === "denied") {
            // The user has denied permission - guide them to enable it manually
            alert("Please enable microphone permissions in your browser settings.");
        } else if (permissionStatus.state === "granted") {
            // Permission was already granted
            return await navigator?.mediaDevices.getUserMedia({ audio: true });
        }
    };
    const startRecording = async () => {
        let stream = await getMicrophonePermission();
        if (stream) {
            try {
                let localAudioChunks = [];
                // setRecording(true);
                dispatch(setIsRecording(true));
                let browserName = getBrowser();
                const media = new MediaRecorder(stream, {
                    mimeType: browserName !== "Safari" ? "audio/webm" : "audio/mp4",
                });
                mediaRecorder.current = media;
                mediaRecorder.current.start();

                stopRecordingTimeout = setTimeout(() => {
                    stopRecording();
                }, 120000);

                mediaRecorder.current.ondataavailable = (event) => {
                    if (typeof event.data === "undefined") return;
                    if (event.data.size === 0) return;
                    localAudioChunks.push(event?.data);
                };
                setAudioChunks(localAudioChunks);
            } catch (error) {
                console.error("Error accessing the microphone:", error);
            }
        }
    };
    const stopRecording = () => {
        if (stopRecordingTimeout) {
            clearTimeout(stopRecordingTimeout);
        }

        // setRecording(false);
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            console.log("herr")
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks);
            // uploadAudio(audioBlob);
            console.log("audioBlob", audioBlob);
            getAudioResponse(audioBlob);
            setTempAudioURL(URL.createObjectURL(audioBlob));
            setAudioChunks([]);

            const reader = new FileReader();

            // Define a callback function to handle the result
            reader.onload = function () {
                const base64String = reader.result;
            };

            // Read the Blob as a data URL (Base64)
            reader.readAsDataURL(audioBlob);
        };
        dispatch(setIsRecording(false));
        dispatch(setDoneRecording(true));
    };
    function inputReplace(input) {
        let result = input.replace(/\u0F38/g, "");
        return result;
    }
    const getAudioResponse = async (audioBlob) => {
        console.log("inside getAudioResponse");
        /*
        let data;
        try {
            let formData = new FormData();
            formData.append("input", audioBlob);

            // formData.append("amplify", AMPLIFICATION_LEVEL.toString());

            let response = await fetch('https://api.staging.monlam.ai' + "/tts/playground", {
                method: "POST",
                body: formData,
                headers: {
                    "x-api-key": '1d10358d507fd825c26711e370eda9a8as',
                },
            });
            data = await response.json();
        } catch (e) {
            console.log("insede catch", e);
            return {
                error: 'error get audio response',
            };
        }
        const { output, responseTime } = data;
        console.log("output", output);
        */
        
        let data;
        try {
            
            let phrase="ཤེས"
            let response = await fetch(`http://127.0.0.1:8000/search/?phrase=${phrase}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            data = await response.json();
            console.log(data);
            dispatch(setResultData(data));
            /* expected data for the following phrase [{"id": 1, "title": "ཤེས་རབ་སྙིང་པོ།", "pdf_urls": {"file_link": "https://drive.google.com/file/d/1xY4VdvQ68qUqVd7fkQUi9vOT5h8nk1sZ/view?usp=drive_link"}, "youtube_urls": {"video_link": "https://www.youtube.com/watch?si=JBb2LpwqosMNaEc7&v=vNU30CGO3yI&feature=youtu.be"}}, {"id": 2, "title": "ཤེས་རབ་སྙིང་པོ།", "pdf_urls": ["https://drive.google.com/file/d/1xY4VdvQ68qUqVd7fkQUi9vOT5h8nk1sZ/view?usp=drive_link"], "youtube_urls": ["https://www.youtube.com/watch?si=JBb2LpwqosMNaEc7&v=vNU30CGO3yI&feature=youtu.be"]}, {"id": 3, "title": "གསོལ་འདེབས་བསམ་པ་ལྷུན་གྲུབ།", "pdf_urls": ["https://drive.google.com/file/d/1Sm3-5bEcbzMH8UxA3uYI-O562NpLBeYj/view?usp=drive_link"], "youtube_urls": ["https://www.youtube.com/watch?v=1AMMlmWO8ek"]}]*/
            // expected data for the "ཤེས་རབ།་" [{"id": 1, "title": "ཤེས་རབ་སྙིང་པོ།", "pdf_urls": {"file_link": "https://drive.google.com/file/d/1xY4VdvQ68qUqVd7fkQUi9vOT5h8nk1sZ/view?usp=drive_link"}, "youtube_urls": {"video_link": "https://www.youtube.com/watch?si=JBb2LpwqosMNaEc7&v=vNU30CGO3yI&feature=youtu.be"}, "img_url": "https://drive.google.com/file/d/1rDaq1LqIZctW0hY4s1U_AwWImNxZ6tE1/view?usp=drive_link"}, {"id": 3, "title": "གསོལ་འདེབས་བསམ་པ་ལྷུན་གྲུབ།", "pdf_urls": ["https://drive.google.com/file/d/1Sm3-5bEcbzMH8UxA3uYI-O562NpLBeYj/view?usp=drive_link"], "youtube_urls": ["https://www.youtube.com/watch?v=1AMMlmWO8ek"], "img_url": "https://drive.google.com/file/d/1oMnp5kCPR0dYomPSWoclga3eSLbDIMQO/view?usp=drive_link"}]
            // for "གཟུགས་མེད" [{"id": 1, "title": "ཤེས་རབ་སྙིང་པོ།", "pdf_urls": {"file_link": "https://drive.google.com/file/d/1xY4VdvQ68qUqVd7fkQUi9vOT5h8nk1sZ/view?usp=drive_link"}, "youtube_urls": {"video_link": "https://www.youtube.com/watch?si=JBb2LpwqosMNaEc7&v=vNU30CGO3yI&feature=youtu.be"}, "img_url": "https://drive.google.com/file/d/1rDaq1LqIZctW0hY4s1U_AwWImNxZ6tE1/view?usp=drive_link"}]
        } catch (e) {
            console.log("insede catch", e);
            return {
                error: 'error get audio response',
            };
        }
        dispatch(setResultData(data));
        
    }
    return (
        <>
            {isRecording && mediaRecorder.current && getBrowser() !== "Safari" && (
                <LiveAudioVisualizer
                    mediaRecorder={mediaRecorder.current}
                    width={200}
                    height={75}
                />
            )}
            {!isRecording &&
                <InnerWhiteCircle onClick={() => toggleRecording()}>
                    <IconButton>
                        <MicIcon style={{ fontSize: 50, color: 'black' }} />
                    </IconButton>
                </InnerWhiteCircle>
            }
            {isRecording &&
                <IconButton onClick={() => toggleRecording()}>
                    <StopIcon style={{ fontSize: 50, color: 'black' }} />
                </IconButton>}
        </>
    );
};

export default AudioRecorder;
