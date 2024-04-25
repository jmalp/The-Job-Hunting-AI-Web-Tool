import { useState, useEffect } from 'react';
import './WaitingSearch.css';

export default function WaitingSearch() {
    const [currIndex, setCurrIndex] = useState([0]);
    const messages = [
        "Searching The Web.",
        "Searching The Web..",
        "Searching The Web...",
        "Tailoring Jobs.",
        "Tailoring Jobs..",
        "Tailoring Jobs..."
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 500);
    
        return () => clearInterval(intervalId);
      }, []);
    
    
    return (
        <div className="waiting-search-message">{messages[currIndex]}</div>
    )
}