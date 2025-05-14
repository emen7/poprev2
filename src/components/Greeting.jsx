import React from 'react';

/**
 * A simple greeting component that displays a welcome message
 * @param {Object} props - Component props
 * @param {string} props.name - Name to display in the greeting
 * @returns {JSX.Element} Greeting component
 */
const Greeting = ({ name = 'Guest' }) => {
  return (
    <div className="greeting-container">
      <h2>Welcome, {name}!</h2>
      <p>Thank you for visiting our application.</p>
    </div>
  );
};

export default Greeting;