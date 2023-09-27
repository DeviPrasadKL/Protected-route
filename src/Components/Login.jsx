import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    var baseURL = "http://localhost:8080";
    const [userInputData, setUserInputData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const notifySucccess = (msg) => toast.success(msg, {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        toastId: "login"
    });
    const notifyWarn = (msg) => toast.warn(msg, {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: "login"
    });
    const notifyError = (msg) => toast.error(msg, {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        toastId: "login"
    });

    // This will handle all the input data and store it in an object
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInputData({ ...userInputData, [name]: value });
    }

    const forgetPassword = (url) => {
        const { email } = userInputData;
        if (email == "") {
            notifyWarn("Please enter email id");
        } else {
            axios.post(url, { email }
            ).then((res) => { notifySucccess(res.data.message); }
            ).catch((err) => { notifyError(err.response.data.message); })
        }
    }

    const handleLogin = (url) => {
        const { email, password } = userInputData;
        axios.post(url, { email, password }
        ).then((res) => {
            notifySucccess(res.data.message);
            localStorage.setItem('login', true);
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        }
        ).catch((err) => { notifyError(err.response.data.message); })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        var regex = "^(?:|[^a-zA-Z0-9]*)$";
        if (userInputData.email == "" && userInputData.password == "") {
            notifyWarn("Please Fill all the details before submitting");
            // alert("Please Fill all the details before submitting");
        } else if (userInputData.email == "") {
            notifyWarn("Please Fill user name before submitting");
            // alert("Please Fill user name before submitting");
        } else if (userInputData.password == "") {
            notifyWarn("Please Fill Psssword before submitting");
            // alert("Please Fill Psssword before submitting");
        } else if (userInputData.email.match(regex) || userInputData.password.match(regex)) {
            notifyWarn("Sorry! That's not a valid Input");
            // alert("Sorry! That's not a valid Input");
        } else {
            handleLogin(`${baseURL}/signin`);
        }
    }
    return (
        <div className='outerdiv'>
            <form className="form">
                <span className="signup">Login</span>
                <input type="email" placeholder="Email" className="form--input" name="email" value={userInputData.email} onChange={handleInput} autoComplete="off" />
                <input type="password" placeholder="Password" className="form--input" name="password" value={userInputData.password} onChange={handleInput} autoComplete="off" />
                <div className="form--marketing">
                    {/* <div style={{ marginRight: "15rem" }}>
                        <input id="okayToEmail" type="checkbox" />
                        <label htmlFor="okayToEmail" className="checkbox">
                            Remember me
                        </label>
                    </div> */}
                    <h4 onClick={() => { forgetPassword(`${baseURL}/forget-password`) }}>Forgot Password</h4>
                </div>

                <div className='buttons-div'>
                    <button className="form--submit" onClick={handleFormSubmit}>
                        Login
                    </button>
                </div>
            </form>
            <ToastContainer
                autoClose={1000}
            />
        </div>
    );
}
