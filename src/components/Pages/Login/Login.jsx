import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Login = () => {
    const { logIn } = useContext(AuthContext);
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleRef = (e) => {
        const user_captcha = e.target.value;
        console.log(user_captcha);
        if (validateCaptcha(user_captcha)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then(result => {
                console.log(result.user);
                if (result.user) {
                    navigate(location.state ? location.state : '/')
                    Swal.fire({
                        title: "Login Successfull!",
                        text: "You've been Logged In!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={e => handleRef(e.target.value)} type="text" name='captcha' placeholder="password" className="input input-bordered" required />
                            <button className='btn btn-xs'>Varify</button>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disable} className="btn btn-primary" type="submit" value="Log In" />
                        </div>
                    </form>
                        <p><Link to={`/register`}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;