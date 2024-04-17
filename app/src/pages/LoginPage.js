import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from "../api_url.json";
import './Login.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

export default function LoginPage() {
    const [action, setAction] = useState("Login");
    const [formErrors, setFormErrors] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [formData, setFormData] = useState({
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
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
        setFeedbackMessage("");
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!formData.email) {
            formIsValid = false;
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors.email = "Email is not valid.";
        }

        if (!formData.password) {
            formIsValid = false;
            errors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            formIsValid = false;
            errors.password = "Password must be at least 8 characters.";
        }

        setFormErrors(errors);
        return formIsValid;
    };

    const handleSignUpClick = () => {
        if (action === "Login") {
            setAction("Sign Up")
            navigate("/form");
        }
    }

    const handleLoginClick = () => {
        if (action === "Sign Up") {
            setAction("Login");
        } else {
            if (validateForm()) {
                requestLogin(formData);
            }
        }
    }

    const requestLogin = async (form) => {
        fetch(url['api_url'] + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.hasOwnProperty("error")) {
                    console.error("Error during login:", data.error);
                    localStorage.setItem("token", data.token);
                    console.log(data)
                    setFeedbackMessage("Login failed: " + data.error);
                } else {
                    localStorage.setItem("token", data.token);
                    console.log("Login successful");
                    setFeedbackMessage("Login successful! Redirecting...");
                    setTimeout(() => {
                        navigate("/search");
                    }, 1000);  // Redirect after 1 sec            
                }
            })
            .catch((error) => {
                console.error("Error logging in: ", error);
                setFeedbackMessage("Login failed. Please check your information and try again.");
            });
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {feedbackMessage && (
            <div className="feedback-message">
                {feedbackMessage}
            </div>
            )}
            <div className="inputs">
                {action === "Login" ? <div></div> :
                    <div className="input">
                        <img src={user_icon} alt="user_icon" className="icon" />
                        <input type="text" placeholder="First Name" className="input-field" name="firstName" value={formData.firstName} onChange={handleFormChange} />
                    </div>}
                <div className="input">
                    <img src={email_icon} alt="user_icon" className="icon" />
                    <input type="email" placeholder="Email" className="input-field" name="email" value={formData.email} onChange={handleFormChange} />
                    {formErrors.email && <div className="error">{formErrors.email}</div>}
                </div>
                <div className="input">
                    <img src={password_icon} alt="user_icon" className="icon" />
                    <input type="password" placeholder="Password" className="input-field" name="password" value={formData.password} onChange={handleFormChange} />
                    {formErrors.password && <div className="error">{formErrors.password}</div>}
                </div>

            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot Password? <span>Click here</span></div>}
            {/* <input type="checkbox" className="checkbox"/>
                    <div className="text">I agree to the Terms and Conditions</div> */}

            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUpClick}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {
                    handleLoginClick()
                }}>Login
                </div>
            </div>
        </div>
    );
}
