import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Register.scss"
import { UserContext } from "../../context/UserContext"
import GoogleIcon from '@mui/icons-material/Google';
// import {ToastContainer, toast} from "react-toastify";
import toast, {Toaster} from "react-hot-toast";
// import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {authenticated, setAuthenticated, setPosts} = useContext(UserContext);

  // const toastOptions = {
  //   postition: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // }

  const navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const promise = axios.post("/auth/register", {name, username, email, password});
      toast.promise(
        promise,
         {
           loading: 'Registering...',
           success: <b>Registered successfully.</b>,
           error: <b>Registration failed.</b>,
         }
      );
      const {data} = await promise;
      console.log("Before toast");
      toast(<b>Verify your email</b>, {
        duration: 5000,
        icon: '📩',
      });
      console.log("After toast");
      if (data.success === true) {
        console.log("Registration success.", data);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }

    } catch (err) {
      console.log("Registration failed.", err.response.data.error);
      toast.error("A user with the given username/email is already registered", {duration: 3000});
    }
  }

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google/callback`,
      "_self"
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="register">
        <div className="card">
          <div className="left">
            <h1>Anonymous Surf</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem perspiciatis at dolore corporis, quidem doloribus rerum, consequuntur cum ratione sit provident facere quis atque delectus ipsa. Maiores eveniet quod modi?</p>
            <span>Do you have an account?</span>
            <Link to='/login'>
            <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <input 
                name="name" 
                type="text" 
                placeholder='Name' 
                value={name} 
                onChange={(ev) => setName(ev.target.value)}
                required
              />
              <input 
                name="username" 
                type="text" 
                placeholder='Username' 
                value={username} 
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
              <input 
                name="email" 
                type="email" 
                placeholder='Email' 
                value={email} 
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
              <input 
                name="password" 
                type="password" 
                placeholder='Password' 
                value={password} 
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>

            <button onClick={googleAuth}>
              <GoogleIcon />
              <span className="google-register">
                Register with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register


