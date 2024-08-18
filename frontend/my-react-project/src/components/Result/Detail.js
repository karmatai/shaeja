import React,{useState} from 'react'
import { IconButton, Typography, } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import tara from "../../assets/tara.jpg";
import { styled } from '@mui/system';
import { setDoneRecording, setIsRecording } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import AudioRecorder from '../Home/AudioRecorder';

const MicButton = styled(IconButton)({
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '20px',
    // border: '2px solid #0040ff', // Blue gradient border
    boxShadow: '0px 0px 50px 20px rgba(255, 0, 0, 0.6)', // Red outer glow
    marginBottom: '20px',
});

const Image = styled('img')({
    width: '150px',
    height: 'auto',
    marginBottom: '20px',
    boxShadow: '0px 0px 20px 10px rgba(0, 0, 0, 0.5)', // Shadow around the image
});

export default function Detail() {
    const dispatch = useDispatch();
    const { isRecording } = useSelector((state) => state.app);
    // const [isRecording, setIsRecording] = useState(false);

    const handleMicClick = () => {
        if(isRecording){
            dispatch(setDoneRecording(true));
            dispatch(setIsRecording(false));
        } else {
            dispatch(setIsRecording(true));
            dispatch(setDoneRecording(false));
        }
    };
  return (
      <>
          <MicButton onClick={() => dispatch(setDoneRecording(false))}>
              <MicIcon sx={{ fontSize: '2.5rem', color: 'black' }}  />
          </MicButton>
          <Typography variant="h4" sx={{ color: 'white', marginBottom: '10px' }}>
              "གསོ་བའི་དམིགས་དོན་"
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'white', marginBottom: '20px' }}>
              མནན་གནས་ཀུན་སྤྱོད་གཞུང་བཙུན་རྒྱལ་དུང་གི་མི་རིགས།
          </Typography>
          <Image src={tara} alt="Tibetan Artwork" />
          <Typography variant="subtitle1" sx={{ color: 'white', marginBottom: '20px' }}>
              རྩོམ་པ་བདུད་གཉན་རྒྱལ་དུང་།
          </Typography>
    </>
  )
}
