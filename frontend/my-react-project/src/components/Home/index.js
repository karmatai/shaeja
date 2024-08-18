import React, { useState, useRef } from 'react';
import { styled } from '@mui/system';
import AudioRecorder from './AudioRecorder'

const OuterGradientCircle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    background: 'radial-gradient(circle, red, darkred)',
});


const MicrophoneButton = () => {
    
    return (
        <OuterGradientCircle>
            <AudioRecorder />
        </OuterGradientCircle>
    );
};

export default MicrophoneButton;
