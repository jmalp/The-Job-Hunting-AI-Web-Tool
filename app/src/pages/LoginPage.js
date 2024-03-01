import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from "../api_url.json";
import './Login.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

export default function LoginPage() {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSignUpClick = () => {
        if (action === "Login") {
            setAction("Sign Up")
        } else {
            navigate("/form"); // Navigate to FormPage
        }
    }

    const handleLoginClick = () => {
        if (action === "Sign Up") {
            setAction("Login")
        } else {
            requestLogin(formData)
        }
    }

    const requestLogin = async (form) => {
        fetch(url['api_url'] + '/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.hasOwnProperty("error")) {
                    console.error("Error during login:", data.error);
                    localStorage.setItem("token", data.token);
                    console.log(data)
                } else {
                    localStorage.setItem("token", data.token);
                    console.log("Login successful");
                    navigate("/jobs");
                }
            })
            .catch((error) => {
                console.error("Error logging in: ", error);
            });
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
                    <input type="text" placeholder="First Name" className="input-field" name="firstName" value={formData.firstName} onChange={handleFormChange} />
                </div>}
                
                <div className="input">
                    <img src={email_icon} alt="user_icon" className="icon"/>
                    <input type="email" placeholder="Email" className="input-field" name="email" value={formData.email} onChange={handleFormChange} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="user_icon" className="icon"/>
                    <input type="password" placeholder="Passoword" className="input-field" name="password" value={formData.password} onChange={handleFormChange} />
                </div>
            
                </div>
                {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click here</span></div>}
                    {/* <input type="checkbox" className="checkbox"/>
                    <div className="text">I agree to the Terms and Conditions</div> */}

            <div className="submit-container">
                {/*<div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUpClick}>Sign Up</div>*/}
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
                    handleSignUpClick()
                }}>Sign Up
                </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {
                    handleLoginClick()
                }}>Login
                </div>
            </div>
        </div>
    );
}
