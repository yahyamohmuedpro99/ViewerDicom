import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css'
const Home = () => {
  // const [uploadedImages, setUploadedImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get('/all_images');
  //       setUploadedImages(response.data);
  //     } catch (error) {
  //       console.error('Error fetching images:', error);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  return (
    <div>
      <h1 >Home</h1>
    </div>
    // <div className="container">
    //   <h2 className="title">All Uploaded Images</h2>
    //   <div className="image-grid">
    //     {uploadedImages.map((imageUrl, index) => (
    //       <div className="image-container" key={index}>
    //         <img src={imageUrl} alt={`Uploaded Image ${index}`} className="image" />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Home;
