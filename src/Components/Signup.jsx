import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';

export default function Signup() {
    var baseURL = "http://localhost:8080";
    const [userInputData, setUserInputData] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
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

    const handleSignUp = (url) => {
        const { userName, email, phoneNumber, password, confirmPassword } = userInputData;
        const userData = { name: userName, email: email, phoneNumber: phoneNumber, password: password, confirmPassword: confirmPassword };
        console.log(userData);
        axios.post(url, userData
        ).then((res) => { notifySucccess(res.data.message); }
        ).catch((err) => { notifyError(err.response.data.message); })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // For Phone number check
        var regex = "^[0-9]+$";
        if (userInputData.userName == "" || userInputData.email == "" || userInputData.password == "" || userInputData.confirmPassword == "" || userInputData.phoneNumber == "") {
            alert("Please Fill all the details before submitting");
        } else if (userInputData.password != userInputData.confirmPassword) {
            alert("Password does not match");
        } else if (userInputData.phoneNumber.length != 10) {
            alert("Phone Number must contain at least ten phone numbers");
        } else if (!userInputData.phoneNumber.match(regex)) {
            alert("Please enter a valid phone number");
        } else {
            handleSignUp(`${baseURL}/signup`);
            alert("Sign up Successfully Completed");
        }
    }
    return (
        <div className='outerdiv'>
            <form className="form">
                <span className="signup">Sign Up</span>
                <input type="username" placeholder="User name" className="form--input" name="userName" value={userInputData.userName} onChange={handleInput} />
                <input type="email" placeholder="Email address" className="form--input" name="email" value={userInputData.email} onChange={handleInput} />
                <input type="tel" placeholder="Contact Number" className="form--input" maxLength="10" name="phoneNumber" value={userInputData.phoneNumber} onChange={handleInput} />
                <input type="password" placeholder="Password" className="form--input" name="password" value={userInputData.password} onChange={handleInput} />
                <input type="password" placeholder="Confirm password" className="form--input" name="confirmPassword" value={userInputData.confirmPassword} onChange={handleInput} />

                <div className='buttons-div'>
                    <button className="form--submit" onClick={handleSubmit}>
                        Sign up
                    </button>
                </div>
            </form>
            <ToastContainer
                transition={Flip}
                autoClose={1000}
            />
        </div>
    );
}
