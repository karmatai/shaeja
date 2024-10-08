import React from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


const YouTubeVideo = ({ videoId }) => {
    const { resultdata } = useSelector((state) => state.app);
    console.log(resultdata);
    return (
        <Box
            sx={{
                position: 'relative',
                // paddingBottom: '56.25%', // 16:9 aspect ratio\
                overflow: 'hidden',
                // maxWidth: '100%',
                width: '300px',
                height: '200px',
                // backgroundColor: '#000',
                borderRadius: '10px',
                // boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.5)',
            }}
        >
            <iframe
                src={resultdata[0].youtube_urls.video_link}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // width: '100%',
                    // height: '100%',
                    borderRadius: '10px',
                }}
            />
        </Box>
    );
};

export default YouTubeVideo;
