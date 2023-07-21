import React from 'react';

const Button = ({ title, onClick, className,  backgroundColor }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || '#FFC610',
    color: '#00276C',
    fontWeight: 'bold',
    
    // Add more styles as needed
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;