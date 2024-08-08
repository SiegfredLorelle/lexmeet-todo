import React, { useState } from "react";

const ScrollableMenu = ({ commands }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ul className="scrollable-menu-container">
      {commands.map((command, index) => (
        
        <li key={index}>
          <button
            onClick={() => {
              setSelectedIndex(index);
              command.action();
            }}
            className={`scrollable-menu-button ${selectedIndex === index ? 'selected' : ''}`}
          >
            {command.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ScrollableMenu;
