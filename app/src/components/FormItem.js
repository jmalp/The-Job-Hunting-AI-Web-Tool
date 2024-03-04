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
          <>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control
              type="text"
              id={item.label}
              onChange={(e) => handleChange(e.target.value, item.value)}
              value={currentValue}
            />
          </>
        )
    case 'number':
        return (
            <>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control
                type="number"
                id={item.label}
                onChange={(e) => handleChange(e.target.value, item.value)}
                value={currentValue}
            />
            </>
        )
      case 'information':
        return (
          <p>
            {item.label}
          </p>
        )
       case 'checkbox':
        return (
          <Form.Check
            type="checkbox"
            label={item.label}
            onChange={(e) => handleChange(e.target.checked, item.value)}
            checked={currentValue}
          />
        )
      case 'select':
        return (
          <div className="mt-2">
            <Form.Select aria-label={item.label} onChange={(e) => onChange(e.target.value, item.value)}>
              <option>{item.label}</option>
              {
                item.options.map((opt, index) => {
                  return (
                    <option value={opt}>{opt}</option>
                  )
                })
              }
            </Form.Select>
          </div>
        )
          case 'dragDropFile':
            return (
            <DragDropFiles />)
    }
  };