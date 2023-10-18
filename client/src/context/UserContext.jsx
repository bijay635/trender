import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const UserContext = createContext();

export function UserContextProvider({children}) {
  const [authenticated, setAuthenticated] = useState(false);
  
  // state for post form
  const [toggleActive, setToggleActive] = useState("off");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("context");
    axios.get("/auth/profile").then(response => {
      setAuthenticated(response.data.status);
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify({status: true, user: response.data.user, username: response.data.username}),
      );

      // fetch posts
      axios.get("/posts").then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        setPosts([]);
      });

    })
    .catch((error) => {
      setAuthenticated(false);
      if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
        localStorage.removeItem(import.meta.env.VITE_LOCALHOST_KEY);
      }
    })
  }, []);
  
  
  return (
    <UserContext.Provider value={{authenticated, setAuthenticated, toggleActive, setToggleActive, posts, setPosts}}>
      {children}
    </UserContext.Provider>
  )
}