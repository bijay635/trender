import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext'

const Post = (props) => {
    console.log(props.postName)

  return (
    <div class = 'postValues'>
      <h2 class = 'nametag'>{props.postName}</h2>
      <div>
        <p class = 'imagetag'>{props.imageurl}</p>
        <p calss = 'captiontag'>{props.caption}</p>
        <p class = 'likestag'>{props.likes}</p>
        <p class = 'commenttag'>{props.comments}</p>
      </div>
    </div>
  )
}

export default Post