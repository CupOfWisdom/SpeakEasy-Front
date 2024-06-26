import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from "axios";
import "./style.css";
import { VideoContext } from '../../utils/VideProvider';

import Spinner from 'react-bootstrap/Spinner';

function BasicExample() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}



const Input = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { setVideoFile, setEmotionData } = useContext(VideoContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('Uploading:', selectedFile);
      setVideoFile(selectedFile);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post('http://localhost:3000/api/upload-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload successful:', response.data);

        // Polling function to check if the JSON is ready
        const checkJsonReady = async () => {
          try {
            const getResponse = await axios.get('http://localhost:3000/api/download-json');
            const result = getResponse.data;
            console.log('Download successful:', result);
            return result;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // JSON not ready yet
              return null;
            } else {
              throw error;
            }
          }
        };

        let result = null;
        while (!result) {
          result = await checkJsonReady();
          if (!result) {
            // Wait for a while before checking again
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }

        setEmotionData(result);
        navigate('/video');
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setLoading(false); // Hide the spinner
      }
    }
  };

  return (
    <div className='main'>
      <Navbar/>
      <form className="form-area">
        <input 
          id='uploadBtn'
          type="file" 
          accept="video/*" 
          name="videoFile"
          onChange={handleFileChange} 
        />
        <label htmlFor="uploadBtn" className=' btnFile'>Upload</label>
        <button id='btnEnv' onClick={handleUpload}>
          Enviar Video
        </button>
        {loading && (
          <div className="loading">
            <BasicExample/>
          </div>
        )}
      </form>
    </div>
  );
};

export default Input;