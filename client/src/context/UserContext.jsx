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
    let currentUser = localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY) ? JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) : null;
    let token = currentUser?.token;
    // console.log(token);
    axios.get("/auth/protected", {
      headers: {
        Authorization: token
      }
    }).then(response => {
      console.log("Authenticated");
      setAuthenticated(response.data.success);
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify(currentUser),
      );

      // fetch posts
      axios.get("/posts", {
        headers: {
          Authorization: token
        }
      }).then(response => {
        setPosts(response.data);
        console.log("posts set");
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