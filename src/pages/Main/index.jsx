import { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import "./style.css";
import { VideoContext } from "../../utils/VideProvider";

const Main = () => {
    const { videoFile, emotionData } = useContext(VideoContext);
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const [currentEmotion, setCurrentEmotion] = useState(null);
    const videoRef = useRef(null);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedEmotions(prevState =>
            checked ? [...prevState, name] : prevState.filter(emotion => emotion !== name)
        );
    };

    useEffect(() => {
        if (!videoFile || !emotionData) return;

        const updateEmotion = () => {
            const currentTime = Math.floor(videoRef.current.currentTime);
            const emotionAtTime = emotionData[currentTime];

            if (emotionAtTime && selectedEmotions.includes(emotionAtTime.emotion)) {
                setCurrentEmotion(`${currentTime}s: ${emotionAtTime.emotion}`);
            } else {
                setCurrentEmotion(`${currentTime}s: No emotion detected`);
            }
        };

        const videoElement = videoRef.current;
        videoElement.addEventListener('timeupdate', updateEmotion);

        return () => {
            videoElement.removeEventListener('timeupdate', updateEmotion);
        };
    }, [videoFile, emotionData, selectedEmotions]);

    return (
        <div className="main">
            <Navbar />

            <div className="container-main glass">
                <form id="checkbox-area">
                    <span>Emotion Filter</span>

                    <div id="checkbox">
                        <input type="checkbox" id="Happy" onChange={handleCheckboxChange} />
                        <label htmlFor="Happy">Happy</label>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="Sad" onChange={handleCheckboxChange} />
                        <label htmlFor="Sad">Sad</label>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="Angry" onChange={handleCheckboxChange} />
                        <label htmlFor="Angry">Angry</label>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="Fear" onChange={handleCheckboxChange} />
                        <label htmlFor="Fear">Fear</label>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="Neutral" onChange={handleCheckboxChange} />
                        <label htmlFor="Neutral">Neutral</label>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="Disgust" onChange={handleCheckboxChange} />
                        <label htmlFor="Disgust">Disgust</label>
                    </div>
                    <div id="checkbox">
                        <input type="checkbox" id="Surprise" onChange={handleCheckboxChange} />
                        <label htmlFor="Surprise">Surprise</label>
                    </div>
                </form>
                <div className="container-video">
                    {videoFile ? (
                        <div>
                            <video width="600" controls ref={videoRef}>
                                <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                            </video>
                            <div>
                                <span>{currentEmotion}</span>
                            </div>
                        </div>
                    ) : (
                        <p>No video uploaded.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
