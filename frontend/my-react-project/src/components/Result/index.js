import React, { useState } from 'react';
import { Box, Typography, ButtonGroup, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/system';
import Detail from './Detail';
import YouTubeVideo from './YouTubeVideo';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useDispatch, useSelector } from 'react-redux';
const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    backgroundColor: '#660000',
    textAlign: 'center',
});

const ActionButtons = styled(ButtonGroup)({
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: '10px',
    width: '250px', // Increased width
    display: 'flex',
    justifyContent: 'space-around',
});

const Result = () => {
    const { isLogedIn } = useSelector((state) => state.app);
    const [tab, settab] = useState('detail');

    return (
        <Container>
            {tab === 'detail' && <Detail />}
            {tab === 'youtube' && <YouTubeVideo />}
            <ActionButtons>
                <LibraryBooksIcon sx={{ color: 'black', cursor: 'pointer' }} onClick={() => settab('detail')} />
                <YouTubeIcon sx={{ color: 'black', cursor: 'pointer' }} onClick={() => settab('youtube')} />
                <PictureAsPdfIcon sx={{ color: 'black',cursor:'pointer' }} />
                <ShareIcon sx={{ color: 'black',cursor:'pointer' }} />
            </ActionButtons>
        </Container>
    );
};

export default Result;
