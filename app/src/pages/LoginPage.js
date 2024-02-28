import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

export default function LoginPage() {
    const [action, setAction] = useState("Login");
    const navigate = useNavigate();

        const handleSignUpClick = () => {
        navigate("/form"); // Navigate to FormPage
    }

    return (
        <div className="container">
            <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                    <div className="input">
                    <img src={user_icon} alt="user_icon" className="icon"/>
                    <input type="text" placeholder="First Name" className="input-field"/>
                </div>}
                
                <div className="input">
                    <img src={email_icon} alt="user_icon" className="icon"/>
                    <input type="email" placeholder="Email" className="input-field"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="user_icon" className="icon"/>
                    <input type="password" placeholder="Passoword" className="input-field"/>
                </div>
            
                </div>
                {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click here</span></div>}
                    {/* <input type="checkbox" className="checkbox"/>
                    <div className="text">I agree to the Terms and Conditions</div> */}

            <div className="submit-container">
                {/*<div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUpClick}>Sign Up</div>*/}
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
                    setAction("Sign Up")
                }}>Sign Up
                </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {
                    setAction("Login")
                }}>Login
                </div>
            </div>
        </div>
    );
}
