import React, { useContext, useEffect, useRef, useState } from 'react'
import './form.scss'
import { UserContext } from '../../context/UserContext'

const Form = () => {
  const {toggleActive} = useContext(UserContext)
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
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

  return (
    <div>
      <form id="post-form" style={{ display: toggleActive === "on" ? "block" : "none" }}>
        <b>Post</b>
        <div className="text">
          <textarea id="post" placeholder="What's happening?..." rows="5" cols="100" />
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