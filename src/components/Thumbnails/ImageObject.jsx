import React from 'react';

const Base64Image = ({ base64 }) => {
    return (
        <div className="flex justify-center items-center p-4">
            <img 
                src={base64} 
                alt="Imagen Base64" 
                className="max-w-md w-full h-auto rounded-lg shadow-md" 
            />
        </div>
    );
};

export default Base64Image;