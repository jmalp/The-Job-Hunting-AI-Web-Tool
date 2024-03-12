import { Form } from "react-bootstrap";
import { useState } from "react";
import DragDropFiles from "./DragDropFiles"

export const FormItem = ({ item, onChange, answer }) => {
  const [currentValue, setCurrentValue] = useState(answer || '');

  const handleChange = (value) => {
    setCurrentValue(value);
    onChange(value, item.value);
  };

    switch (item.type) {
      
    case 'text':
      return (
        <div className="form-inputs">
          <div className="form-group">
          <label className="form-group label" htmlFor={item.label}>{item.label}</label>
          <input
          className="form-group input"
            type="text"
            id={item.label}
            onChange={(e) => handleChange(e.target.value)}
            value={currentValue}
          />
          </div>
        </div>
      )
    case 'number':
      return (
        <div className="form-inputs">
          <div className="form-group">
          <label htmlFor={item.label}>{item.label}</label>
          <input
          className="form-group input"
            type="number"
            id={item.label}
            onChange={(e) => handleChange(e.target.value)}
            value={currentValue}
          />
        </div>
        </div>
      )
    case 'information':
      return (
        <div className="form-inputs">
          <div className="form-group">
          <p>{item.label}</p>
        </div>
        </div>
      )
    case 'checkbox':
      return (
        <div>
          <input
            type="checkbox"
            id={item.label}
            onChange={(e) => handleChange(e.target.checked)}
            checked={currentValue}
          />
          <label htmlFor={item.label}>{item.label}</label>
        </div>
      )
    case 'select':
      return (
        <div className="form-inputs">
          <div className="form-group">
          <select aria-label={item.label} onChange={(e) => onChange(e.target.value, item.value)}>
            <option>{item.label}</option>
            {item.options.map((opt, index) => (
              <option key={index} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        </div>

      )
    case 'dragDropFile':
      return (
        <DragDropFiles />
      )
    default:
      return null;
  }
};