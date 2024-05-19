import React, { useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import axios from "axios"

import "./style.css"
import { VideoContext } from '../../utils/VideProvider';

const Input = () => {
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
          if (selectedFile) {
            setVideoFile(selectedFile);
          const formData = new FormData();
          formData.append("file", selectedFile)

          try {
            const response = await axios.post('http://localhost:3000/api/upload-video', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            console.log('Upload successful:', response.data);

            const getResponse = await axios.get('http://localhost:3000/api/download-json');
            const result = getResponse.data;
            console.log('Download successful:', result);
    
            setVideoFile(selectedFile);
            setEmotionData(result);
            
            navigate('/video');
          } catch (error) {
            console.error('Upload failed:', error);
          }
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
                <label htmlFor="uploadBtn" className='btn-s btnFile'>Upload</label>
                <button onClick={handleUpload}>
                    Enviar Video
                </button>
            </form>
        </div>
    
  )
}
export default Input