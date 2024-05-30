import React from 'react';

const Suggestions = ({ suggestions, activeIndex, handleClick }) => {
  return (
    <div className="suggestions-container">
      {suggestions.slice(0, 5).map((suggestion, index) => {
        const matchedChars = suggestion.slice(0, activeIndex + 1);
        const remainingChars = suggestion.slice(activeIndex + 1);

        return (
          <div
            key={suggestion}
            className={`suggestion ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleClick(suggestion)}
          >
            <span>
              <strong>{matchedChars}</strong>
              {remainingChars}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;