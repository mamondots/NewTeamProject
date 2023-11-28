import React from 'react';

const Button = ({ children, className, type, eventHandler }) => {
    return <button onClick={eventHandler} type={type} className={`px-6 py-4 text-[15px] hover:bg-[#434760] bg-[#FC7676] transition-color duration-500 rounded-ss-3xl rounded-ee-3xl ${className}`}>{children}</button>;
};

export default Button;