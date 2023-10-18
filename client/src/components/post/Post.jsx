import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import './post.scss'

const Post = (props) => {
    console.log(props.postName)

  return (
    <div className='postValues'>
      <h2 className='nametag'>{props.postName}</h2>
      {props.imageurl && (
        <div className='imagetag-container'>
          {/* <p className='imagetag'>{props.imageurl}</p> */}
            <img 
              className='imagetag'
              src={props.imageurl}
              alt="postImage"
            />
        </div>
      )}
      <div>
        <p className='captiontag'>{props.caption}</p>
        {/* <p className='likestag'>{props.likes}</p> */}
        <p className='commenttag'>{props.comments}</p>
      </div>
    </div>
  )
}

export default Post