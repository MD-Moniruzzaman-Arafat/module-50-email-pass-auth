import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    // error message state
    const [errorMessage, setErrorMessage] = useState('');
    // success message state
    const [successMessage, setSuccessMessage] = useState('');

    const emailRef = useRef();

    const handleLogin = (e) => {
        // page reload off
        e.preventDefault()

        // clear message
        setErrorMessage('');
        setSuccessMessage('');

        const email = e.target.email.value
        const password = e.target.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential.user)
                // const user = userCredential.user;
                if (userCredential.user.emailVerified) {
                    setSuccessMessage('Login SuccessFull')
                    return
                } else {
                    setErrorMessage("email is not verify")
                    return
                }
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(error.message)
                setErrorMessage(error.message)
            });
    }

    const handelForgetPassword = () => {
        const email = emailRef.current.value
        console.log("email is", email)
        if (!email) {
            setErrorMessage("enter valid email plz")
            return
        }
        // else if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        //     setErrorMessage("enter valid email plz")
        //     return
        // }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..

            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(error.message)
                // ..
            });

    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" name="email" placeholder="email" className="input input-bordered" ref={emailRef} required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="text" name="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover" onClick={handelForgetPassword}>Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                {
                                    errorMessage && <p className="text-red-600">{errorMessage}</p>
                                }
                                {
                                    successMessage && <p className="text-green-600">{successMessage}</p>
                                }
                                <p className="mt-3">New this website plz <Link to={"/register"}>Register</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;