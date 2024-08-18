import React, { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { LiveAudioVisualizer } from "react-audio-visualize";
import { styled } from '@mui/system';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch, useSelector } from 'react-redux';
import { setDoneRecording, setIsRecording } from '../../redux/action';
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
    // const stopRecording = () => {
    //     if (stopRecordingTimeout) {
    //         clearTimeout(stopRecordingTimeout);
    //     }

    //     // setRecording(false);
    //     //stops the recording instance
    //     mediaRecorder.current.stop();
    //     mediaRecorder.current.onstop = () => {
    //         console.log("herr")
    //         //creates a blob file from the audiochunks data
    //         const audioBlob = new Blob(audioChunks);
    //         // uploadAudio(audioBlob);
    //         console.log("audioBlob", audioBlob);
    //         getAudioResponse(audioBlob);
    //         setTempAudioURL(URL.createObjectURL(audioBlob));
    //         setAudioChunks([]);

    //         const reader = new FileReader();

    //         // Define a callback function to handle the result
    //         reader.onload = function () {
    //             const base64String = reader.result;
    //         };

    //         // Read the Blob as a data URL (Base64)
    //         reader.readAsDataURL(audioBlob);
    //     };
    //     dispatch(setIsRecording(false));
    //     dispatch(setDoneRecording(true));
    // };
    // function inputReplace(input) {
    //     let result = input.replace(/\u0F38/g, "");
    //     return result;
    // }
    // const getAudioResponse = async (audioBlob) => {
    //     console.log("inside getAudioResponse");
    //     let data;
    //     try {
    //         let formData = new FormData();
    //         formData.append("input", inputReplace(audioBlob));

    //         // formData.append("amplify", AMPLIFICATION_LEVEL.toString());

    //         let response = await fetch('https://api.staging.monlam.ai' + "/stt/playground", {
    //             method: "POST",
    //             body: formData,
    //             headers: {
    //                 "x-api-key": '1d10358d507fd825c26711e370eda9a8as',
    //             },
    //         });
    //         data = await response.json();
    //     } catch (e) {
    //         console.log("insede catch", e);
    //         return {
    //             error: 'error get audio response',
    //         };
    //     }
    //     const { output, responseTime } = data;
    //     console.log("output", output);
    // }

    const stopRecording = async () => {
        if (stopRecordingTimeout) {
            clearTimeout(stopRecordingTimeout);
        }

        if (!mediaRecorder.current) return;

        try {
            // Stop the recording instance
            mediaRecorder.current.stop();

            mediaRecorder.current.onstop = async () => {
                console.log("Recording stopped");

                // Create a blob file from the audioChunks data
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                setTempAudioURL(URL.createObjectURL(audioBlob));
                setAudioChunks([]);

                try {
                    const base64String = await readBlobAsDataURL(audioBlob);
                    console.log("Base64 Audio String:", base64String);
                    await getAudioResponse(audioBlob);
                } catch (err) {
                    console.error("Error reading audio blob:", err);
                }
            };

            dispatch(setIsRecording(false));
            dispatch(setDoneRecording(true));

        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };

    // Helper function to read a Blob as a Base64 string
    const readBlobAsDataURL = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Utility function to clean the input (if needed)
    const inputReplace = (input) => input.replace(/\u0F38/g, "");

    // Function to send the audio data to the server
    const getAudioResponse = async (audioBlob) => {
        console.log("inside getAudioResponse");

        let formData = new FormData();
        formData.append("input", audioBlob);

        try {
            let response = await fetch('https://api.staging.monlam.ai/stt/playground', {
                method: "POST",
                body: formData,
                headers: {
                    "x-api-key": '1d10358d507fd825c26711e370eda9a8as',
                },
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            const { output, responseTime } = data;
            console.log("output", output);

            return { output, responseTime };

        } catch (error) {
            console.error("Error in getAudioResponse:", error);
            return {
                error: 'Error fetching audio response',
            };
        }
    };

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
