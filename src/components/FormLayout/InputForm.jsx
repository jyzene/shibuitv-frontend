// src/components/Input.js
import React from 'react';

const InputForm = ({ type = 'text', name, value, onChange, placeholder, label, className = '', ...rest }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=""
        className="peer placeholder-transparent h-10 w-full px-4 border-b-2 mt-4 border-wood focus:outline-none text-wood font-subtitle bg-transparent"
        {...rest}
      />
      {label && (
        <label
          htmlFor={name}
          className="absolute left-0 -top-3.5 text-wood px-4 text-sm font-subtitle peer-placeholder-shown:text-base
          peer-placeholder-shown:text-wood peer-placeholder-shown:top-5 transition-all peer-focus:-top-1
          peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default InputForm;
