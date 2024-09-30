// src/components/SubmitButton.js
import React from 'react';

const SubmitButton = ({ text = 'Submit', className = '', ...rest }) => {
  return (
    <button
      type="submit"
      className={`bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 mt-5 transition duration-500 hover:bg-watermelon ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
