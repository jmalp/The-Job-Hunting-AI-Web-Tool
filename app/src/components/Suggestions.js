import React from 'react';

const Suggestions = ({ suggestions, activeIndex, handleClick }) => {
  return (
    <div className="suggestions-container">
      {suggestions.slice(0, 5).map((suggestion, index) => (
        <div
          key={suggestion}
          className={`suggestion ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleClick(suggestion)}
        >
          <span>
            {suggestion.slice(0, activeIndex + 1)}
            <strong>{suggestion.slice(activeIndex + 1)}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;