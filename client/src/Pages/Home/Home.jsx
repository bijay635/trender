import { useState, useEffect, useContext } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import Post from "../../components/post/Post";
import { UserContext } from "../../context/UserContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import spinner from "../../assets/Spinner.gif";

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const {authenticated, posts, setPosts} = useContext(UserContext);
  const [data, setData] = useState([]);

  // Check if posts are available in the context before initializing data
  useEffect(() => {
    if (posts.length > 0) {
      setData(posts.slice(0, 10));
    }
  }, [posts]);

  const [page, setPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  /*
  timer - 500ms
  get post from API
  useState post - 
  */
  // let postValue = [
  //   {
  //     "postUser":"Bijay",
  //     "caption":"Life is short",
  //     "imageurl":"www.inshot.com",
  //     "likes":80,
  //     "comments":45
  //   },
  //   {
  //     "postUser":"Roshan",
  //     "caption":"Life is long like donkey",
  //     "imageurl":"www.tusshy.com",
  //     "likes":800,
  //     "comments":405
  //   },d
  //   {
  //     "postUser":"Amit",
  //     "caption":"nagaland",
  //     "imageurl":"www.army.com",
  //     "likes":8,
  //     "comments":45
  //   },
  //   {
  //     "postUser":"Bijay",
  //     "caption":"Life is short",
  //     "imageurl":"www.inshot.com",
  //     "likes":80,
  //     "comments":45
  //   },
  //   {
  //     "postUser":"Roshan",
  //     "caption":"Life is long like donkey",
  //     "imageurl":"www.tusshy.com",
  //     "likes":800,
  //     "comments":405
  //   },
  //   {
  //     "postUser":"Amit",
  //     "caption":"nagaland",
  //     "imageurl":"www.army.com",
  //     "likes":8,
  //     "comments":45
  //   },
  //   {
  //     "postUser":"Bijay",
  //     "caption":"Life is short",
  //     "imageurl":"www.inshot.com",
  //     "likes":80,
  //     "comments":45
  //   },
  //   {
  //     "postUser":"Roshan",
  //     "caption":"Life is long like donkey",
  //     "imageurl":"www.tusshy.com",
  //     "likes":800,
  //     "comments":405
  //   },
  //   {
  //     "postUser":"Amit",
  //     "caption":"nagaland",
  //     "imageurl":"www.army.com",
  //     "likes":8,
  //     "comments":45
  //   }
  // ];

  /*
  postUser
  caption
  img-url;
  likes
  comments
  */

  // fetch more data for infinite scrolling
  const getPageData = () => {
    setTimeout(() => {
      let lIdx = page;
      let pageNum = page;
      let newData = [];
      for (let i = lIdx; (i < posts.length) && (i < lIdx + 10); i++, pageNum++) {
        newData.push(posts[i]);
        if (i === posts.length - 1) {
          setHasMore(false);
        }
      }
      setPage(pageNum);
      setData((prev) => [...prev, ...newData]);
    }, 2000);
  }

  useEffect(() => {
    console.log("at home");
    if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)));
    }
  }, []);

  // useEffect(() => {
  //   // fetch posts
  //   const fetchData = async () => {
  //     try {
  //       const response = axios.get("/posts");
  //       setPosts(response.data);
  //       getPageData();
  //     } catch (err) {
  //       setPosts([]);
  //     }
  //   }
    
  //   fetchData();
  // }, [setPosts]);

  return (
    <div className='home'>
      <h1>Home</h1>
      <h3>{currentUser?.user.username}</h3>
      <Form />
      <h1>Main Stream</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={getPageData}
        hasMore={hasMore}
        loading={<img className='spinner-gif' src={spinner} alt='spinner' />}
      >
        {data.map((ps, index) => {
          console.log(ps.username);
          return (
            <Post 
              key={ps._id}
              postName={ps.username}
              imageurl={ps.picturePath} 
              caption={ps.description} 
              // likes={ps.likes} 
              comments={ps.comments} 
            />
          )
        })}
      </InfiniteScroll>
      {/* {hasMore && <img className='spinner-gif' src={spinner} alt='spinner' />} */}
    </div>
  )
}

export default Home
