import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import UserReducer from "./UserReducer";


export const UserContext = createContext();

export function UserContextProvider({children}) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("context");
    axios.get("/auth/profile").then(response => {
      setAuthenticated(response.data.status);
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify({status: true}),
      );
    })
    .catch((error) => {
      setAuthenticated(false);
      if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
        localStorage.removeItem(import.meta.env.VITE_LOCALHOST_KEY);
      }
    })
  }, []);
  
  // state for post form
  const [toggleActive, setToggleActive] = useState("off");
  
  return (
    <UserContext.Provider value={{authenticated, setAuthenticated, toggleActive, setToggleActive}}>
      {children}
    </UserContext.Provider>
  )
}