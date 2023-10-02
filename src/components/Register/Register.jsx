import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
    // error message state
    const [errorMessage, setErrorMessage] = useState('');
    // success message state
    const [successMessage, setSuccessMessage] = useState('');
    // password show toggol
    const [showPassword, setShowPassword] = useState(false);


    // submit handler
    const handleSubmit = e => {
        // page reload off
        e.preventDefault();

        // clear message
        setErrorMessage('');
        setSuccessMessage('');

        // get value from input field
        const userName = e.target.user.value
        const email = e.target.email.value
        const password = e.target.password.value
        const checked = e.target.terms.checked
        console.log(email, password, checked)

        // terms error handle
        if (!checked) {
            setErrorMessage("accept terms and condition")
            return
        }

        // password error handle
        if (password.length < 6) {
            setErrorMessage('password must be 6 char');
            return
        }

        // password validation with regular expression
        if (!/[0-9][A-Z]/.test(password)) {
            setErrorMessage('not valid password');
            return
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                // const user = userCredential.user;
                console.log(userCredential.user)

                setSuccessMessage('Registration SuccessFull')


                updateProfile(auth.currentUser, {
                    displayName: userName
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error.message)
                });
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(error)
                setErrorMessage(error.message)
                // ..
            });
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">UserName</span>
                                    </label>
                                    <input type="text" placeholder="userName" className="input input-bordered" name="user" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={showPassword ? 'text' : "password"} placeholder="password" className="input input-bordered" name="password" required />
                                    <label onClick={() => setShowPassword(!showPassword)} htmlFor="" className="absolute top-12 left-48 text-xl">

                                        {
                                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                        }
                                    </label>
                                </div>

                                <div className="mt-5">
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label htmlFor="terms"> accept terms and condition</label>
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                                {
                                    errorMessage && <p className="text-red-600">{errorMessage}</p>
                                }
                                {
                                    successMessage && <p className="text-green-600">{successMessage}</p>
                                }
                                <p className="mt-3">All ready have account plz <Link to={"/login"}>Login</Link></p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;