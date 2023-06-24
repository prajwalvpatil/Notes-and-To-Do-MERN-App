import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
import bg from '../img/cover.jpeg'
import '@fortawesome/fontawesome-free/css/all.css';
import 'mdbreact/dist/css/mdb.css';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword)
    }

    return (
        <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={bg} className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form className="login" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <br />
                <label>Email:</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
      
                <label>Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <p>
                  <a href="#" onClick={handleShowPasswordChange}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </a>
                </p>
      
                <button disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>      
    );
}
 
export default Login;