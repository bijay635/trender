import { useState, useEffect } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import Post from "../../components/post/Post";

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  /*
  timer - 500ms
  get post from API
  useState post - 
  */
  let postValue = [
    {
      "postUser":"Bijay",
      "caption":"Life is short",
      "imageurl":"www.inshot.com",
      "likes":80,
      "comments":45
    },
    {
      "postUser":"Roshan",
      "caption":"Life is long like donkey",
      "imageurl":"www.tusshy.com",
      "likes":800,
      "comments":405
    },
    {
      "postUser":"Amit",
      "caption":"nagaland",
      "imageurl":"www.army.com",
      "likes":8,
      "comments":45
    },
    {
      "postUser":"Bijay",
      "caption":"Life is short",
      "imageurl":"www.inshot.com",
      "likes":80,
      "comments":45
    },
    {
      "postUser":"Roshan",
      "caption":"Life is long like donkey",
      "imageurl":"www.tusshy.com",
      "likes":800,
      "comments":405
    },
    {
      "postUser":"Amit",
      "caption":"nagaland",
      "imageurl":"www.army.com",
      "likes":8,
      "comments":45
    },
    {
      "postUser":"Bijay",
      "caption":"Life is short",
      "imageurl":"www.inshot.com",
      "likes":80,
      "comments":45
    },
    {
      "postUser":"Roshan",
      "caption":"Life is long like donkey",
      "imageurl":"www.tusshy.com",
      "likes":800,
      "comments":405
    },
    {
      "postUser":"Amit",
      "caption":"nagaland",
      "imageurl":"www.army.com",
      "likes":8,
      "comments":45
    }
  ];

  /*
  postUser
  caption
  img-url;
  likes
  comments
  */

  useEffect(() => {
    console.log("at home");
    if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='home'>
      <h1>Main Stream</h1>
      {postValue.map((ps,index)=> {
        console.log("J")
        return <Post postName={ps.postUser}
        imageurl={ps.imageurl} caption={ps.caption} likes={ps.likes} comments={ps.comments} />
      })}
      <h1>Home</h1>
      <Form />
      <h3>{currentUser?.username}</h3>
    </div>
  )
}

export default Home
