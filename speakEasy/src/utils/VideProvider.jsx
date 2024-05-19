import React, { createContext, useState } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [emotionData , setEmotionData ] = useState(null)

    return (
        <VideoContext.Provider value={{ videoFile, setVideoFile, emotionData, setEmotionData}}>
            {children}
        </VideoContext.Provider>
    );
};
