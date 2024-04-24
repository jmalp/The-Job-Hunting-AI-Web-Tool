import React, { useState } from 'react';
import { skills } from '../SkillList';
import Suggestions from './Suggestions';

const SkillsInput = ({ addSkill }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  
    const suggestions = value
      ? skills.filter((skill) =>
          skill.toLowerCase().startsWith(value.toLowerCase())
        )
      : [];
    setSuggestions(suggestions);
  
    if (value === '') {
      setActiveIndex(-1);
    }
  };

  const handleClick = async (suggestion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/add-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ skill: suggestion }),
      });

      if (response.ok) {
        addSkill(suggestion);
        setInput('');
        setSuggestions([]);
        setActiveIndex(-1);
      } else {
        console.error('Failed to add skill');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Add a skill..."
      />
      {suggestions.length > 0 && (
        <Suggestions
          suggestions={suggestions}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default SkillsInput;