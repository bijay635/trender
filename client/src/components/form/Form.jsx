import React, { useContext, useEffect, useRef, useState } from 'react'
import './form.scss'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import spinner from '../../assets/Spinner.gif'

const Form = () => {
  const {toggleActive, setToggleActive, setPosts} = useContext(UserContext)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [post, setPost] = useState("");
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef();
  console.log("Hi this is form")

  
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

    let currentUser = localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY) ? JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) : null;
    let token = currentUser?.token;

    setLoader(true);
    const formData = new FormData();
    formData.append("userId", currentUser.user._id);
    formData.append("username", currentUser.user.username);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
    }

    const response = await axios.post("/posts", formData, {
      headers: {
        Authorization: token
      }
    });
    setPosts(response.data);
    setLoader(false);
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
          {loader && <img className='spinner-gif' src={spinner} alt='spinner' />}
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