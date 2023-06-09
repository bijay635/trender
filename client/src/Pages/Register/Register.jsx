import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Register.scss"
import { UserContext } from "../../context/UserContext"
import GoogleIcon from '@mui/icons-material/Google';


const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {authenticated, setAuthenticated} = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();
    const {data} = await axios.post("/auth/register", {name, username, email, password});

    if (data.status === true) {
      setAuthenticated(true);
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify({status: true}),
      );
      console.log("set in register");
      navigate("/");
    }
  }

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      "_self"
    );
  }

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  return (
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
  )
}

export default Register


