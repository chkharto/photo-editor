import React, { useState } from "react";
import './home.css'

const Home = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
  
    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      if (selectedImage) {
        setImage(URL.createObjectURL(selectedImage));
      } 
    };
  
    const handleTextChange = (e) => {
      setText(e.target.value);
    };
  
    const handleSubmit = () => {
      // Handle the submission logic here, e.g., sending the image and text to a server
      console.log('Image:', image);
      console.log('Text:', text);
      // Reset the state after submission if needed
      setImage(null);
      setText('');
    };

  return (
    <div id="Home" className="home">
      <h1>This is Home page</h1>
    </div>
  );
};

export default Home;
