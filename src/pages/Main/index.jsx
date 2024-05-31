import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import "./style.css";
import { VideoContext } from "../../utils/VideProvider";

const Main = () => {
    const { videoFile, emotionData } = useContext(VideoContext);
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const [currentEmotion, setCurrentEmotion] = useState('');
    const videoRef = useRef(null);

    const handleCheckboxChange = (emotion) => {
        setSelectedEmotions((prev) =>
            prev.includes(emotion)
                ? prev.filter((e) => e !== emotion)
                : [...prev, emotion]
        );
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleTimeUpdate = () => {
                const currentTime = Math.floor(video.currentTime);
                const emotionAtCurrentTime = emotionData.find(
                    (data) => data.time === currentTime
                );

                if (emotionAtCurrentTime) {
                    const { emotion, probabilities } = emotionAtCurrentTime;
                    const highestEmotion = Object.keys(probabilities).reduce((a, b) =>
                        probabilities[a] > probabilities[b] ? a : b
                    );

                    if (selectedEmotions.includes(highestEmotion)) {
                        setCurrentEmotion(
                            `Tempo: ${currentTime}s, Emoção: ${highestEmotion}`
                        );
                    } else {
                        setCurrentEmotion('');
                    }
                }
            };

            video.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [emotionData, selectedEmotions]);

    return (
        <div className="main">
            <Navbar />

            <div className="container-main glass">
                <form id="checkbox-area">
                    <span>Filtro de Emoções</span>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Felicidade"
                            onChange={() => handleCheckboxChange('happy')}
                        />
                        <label htmlFor="Felicidade">Felicidade</label>
                    </div>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Tristeza"
                            onChange={() => handleCheckboxChange('sad')}
                        />
                        <label htmlFor="Tristeza">Tristeza</label>
                    </div>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Raiva"
                            onChange={() => handleCheckboxChange('angry')}
                        />
                        <label htmlFor="Raiva">Raiva</label>
                    </div>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Medo"
                            onChange={() => handleCheckboxChange('fear')}
                        />
                        <label htmlFor="Medo">Medo</label>
                    </div>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Neutro"
                            onChange={() => handleCheckboxChange('neutral')}
                        />
                        <label htmlFor="Neutro">Neutro</label>
                    </div>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Nojo"
                            onChange={() => handleCheckboxChange('disgust')}
                        />
                        <label htmlFor="Nojo">Nojo</label>
                    </div>
                    <div id="checkbox">
                        <input
                            type="checkbox"
                            name="Surpreso"
                            onChange={() => handleCheckboxChange('surprise')}
                        />
                        <label htmlFor="Surpreso">Surpreso</label>
                    </div>
                </form>
                <div className="container-video">
                    {videoFile ? (
                        <>
                            <video ref={videoRef} width="600" controls>
                                <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                            </video>
                            <span> {currentEmotion ? currentEmotion : "Nenhuma Emoçao Detectada"}</span>
                        </>
                    ) : (
                        <p>No video uploaded.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
