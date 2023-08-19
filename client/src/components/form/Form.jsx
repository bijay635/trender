import React, { useContext, useEffect, useRef, useState } from 'react'
import './form.scss'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

const Form = () => {
  const {toggleActive, setToggleActive} = useContext(UserContext)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [post, setPost] = useState("");
  const fileInputRef = useRef();
  
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handlePost = async(e) => {
    e.preventDefault();

    const id = JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)).user;
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
    }

    const response = await axios.post("/posts", formData);
    setImage(null);
    setPost("");
    setToggleActive("off");
  }

  return (
    <div>
      <form id="post-form" style={{ display: toggleActive === "on" ? "block" : "none" }} onSubmit={handlePost}>
        <b>Post</b>
        <div className="text">
          <textarea
            id="post"
            placeholder="What's happening?..."
            rows="5"
            cols="100"
            value={post}
            onChange={e => setPost(e.target.value)}
           />
        </div>
        <div className="image-upload">
          {preview ? (
            <img
              src={preview}
              style={{ objectFit: "cover", display: "block", margin: "0 auto" }}
              onClick={() => {
                setImage(null);
              }}
              height="250px"
            />
          ) : (
            <>
              <b>Add image</b>
              <br></br>
              <label htmlFor="file-input">
                <img src="/Images/photo-camera.png" height="25px"/>
              </label>
            </>
          )}
          <input 
            id="file-input" 
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(event) => {
              // console.log(event.target.files);
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImage(file);
              } else {
                setImage(null);
              }
            }} />
        </div>
        <button id='submit' type='submit'>Create Post</button>
      </form>
    </div>
  )
}

export default Form