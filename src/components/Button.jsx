import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
    >
      {children}
    </button>
  );
};

export default Button;
