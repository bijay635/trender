import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const {authenticated, setAuthenticated} = useContext(UserContext);

  const toastOptions = {
    postition: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }


  const handleChange = (ev) => {
    setValues({...values, [ev.target.name]: ev.target.value});
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const {username, password} = values;
    try {
      const {data} = await axios.post("/auth/login", {username, password});
      if (data.status === true) {
        setAuthenticated(true);
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify({status: true}),
        );
        console.log("set in login");
        navigate("/");
      }
    } catch (err) {
      toast.error("Authentication Failed. Invalid username/password", toastOptions);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);


  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className='login'>
        <div className="card">
          <div className="left">
            <h1>Hello Peeps!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem perspiciatis at dolore corporis, quidem doloribus rerum, consequuntur cum ratione sit provident facere quis atque delectus ipsa. Maiores eveniet quod modi?</p>
            <span>Don't have a account?</span>
            <Link to='/register'>
            <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
              <input 
                name="username" 
                type="text" 
                placeholder='Username'
                value={values.username} 
                onChange={handleChange}
                required 
              />
              <input 
                name="password" 
                type="password" 
                placeholder='Password' 
                value={values.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Login</button>
            </form>

            <button>
              <GoogleIcon />
              <span className="google-login">
                Login with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
