import { Link } from "react-router-dom"
import "./Register.scss"

const Register = () => {
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
            <form >
              <input type="text" placeholder='Name'/>
              <input type="text" placeholder='Username'/>
              <input type="email" placeholder='Email'/>
              <input type="password" placeholder='Password'/>
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Register


