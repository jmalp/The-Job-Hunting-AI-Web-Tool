import "./FormItem.css";
import { useState } from "react";

export const FormItem = ({ item, onChange, answer }) => {
  const [currentValue, setCurrentValue] = useState(answer || "");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true); 
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true); 
  const [phoneTouched, setPhoneTouched] = useState(false);

  const handleChange = (e, isCheckbox) => {
    const newValue = isCheckbox ? e.target.checked : e.target.value;
    setCurrentValue(newValue);

    if (item.type === 'email') {
      setEmailTouched(true);
    }

    if (item.type === 'password') {
      setPasswordTouched(true);
      setIsPasswordValid(newValue.length >= 10); 
    }

    if (item.type === 'phone_number') {
      setPhoneTouched(true);
      const phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
      setIsPhoneValid(phoneRegex.test(newValue.replace(/[\s()-]+/g, "")));
    }

    onChange(newValue, item.value);
  };

  const handleBlur = () => {
    if (item.type === 'email' && emailTouched) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(currentValue));
    }
    if (item.type === 'password' && passwordTouched) {
      setIsPasswordValid(currentValue.length >= 10);
    }
    if (item.type === 'phone_number' && phoneTouched) {
      const phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
      setIsPhoneValid(phoneRegex.test(currentValue.replace(/[\s()-]+/g, "")));
    }
  };

  const handleFocus = () => {
    if (item.type === 'email') {
      setIsEmailValid(true);
    }
    if (item.type === 'password') {
      setIsPasswordValid(true);
    }
    if (item.type === 'phon_number') {
      setIsPhoneValid(true);
    }
  };

  const inputProps = {
    className: `input-field ${item.type} ${
      item.value === "firstName" || item.value === "lastName" ? "inline-fields" : ""
    }`,
    id: item.value,
    placeholder: item.label,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    value: item.type === "checkbox" ? undefined : currentValue,
    checked: item.type === "checkbox" ? currentValue : undefined,
    type: item.type
  };

  return (
    <div className={`input ${item.type} ${item.value === "firstName" || item.value === "lastName" ? "inline-fields" : ""}`}>
      {item.type !== "select" ? (
        <>
          <input {...inputProps} />
          {item.type === 'email' && emailTouched && !isEmailValid && (
            <div className="error-message">Please enter a valid email address</div>
          )}
          {item.type === 'password' && passwordTouched && !isPasswordValid && (
            <div className="error-message">Password must be at least 10 characters long.</div>
          )}
          {item.type === 'phone_number' && phoneTouched && !isPhoneValid && (
            <div className="error-message">Please enter a valid phone number</div>
          )}
        </>
      ) : (
        <select {...inputProps}>
          <option value="" disabled>{item.label}</option>
          {item.options.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))}
        </select>
      )}
    </div>
  );
};
