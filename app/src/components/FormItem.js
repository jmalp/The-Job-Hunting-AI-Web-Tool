import "./FormItem.css"
import { Form } from "react-bootstrap";
import { useState } from "react";
import DragDropFiles from "./DragDropFiles"

export const FormItem = ({ item, onChange, answer }) => {
  const [currentValue, setCurrentValue] = useState(answer || '');

  const handleChange = (e, isCheckbox) => {
    const newValue = isCheckbox ? e.target.checked : e.target.value;
    setCurrentValue(newValue);
    onChange(newValue, item.value);
  };

  const inputType = item.type === 'select' ? 'select' : 'input';
  
  const inputProps = {
    className: `input-field ${item.type}`,
    id: item.value,
    placeholder: item.label,
    onChange: (e) => handleChange(e, item.type === 'checkbox'),
    value: item.type === 'checkbox' ? undefined : currentValue,
    checked: item.type === 'checkbox' ? currentValue : undefined,
  };

  return (
    <div className={`input ${item.type} ${item.value === 'firstName' || item.value === 'lastName' ? 'inline-fields' : ''}`}>
      {inputType === 'select' ? (
        <select {...inputProps}>
          <option value="" disabled>{item.label}</option>
          {item.options.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input {...inputProps} type={item.type} />
      )}
    </div>
  );
};
