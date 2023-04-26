import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
  return (
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
            <form >
              <input type="text" placeholder='Username'/>
              <input type="password" placeholder='Password'/>
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>

  )
}

export default Login
