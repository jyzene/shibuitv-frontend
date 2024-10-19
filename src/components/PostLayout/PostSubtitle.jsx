// src/components/Title.js
import React from 'react';

const PostSubtitle = ({ text }) => {
  return (
    <h1 className="text-md font-subtitle text-wood mb-5">
      {text}
    </h1>
  );
};

export default PostSubtitle;