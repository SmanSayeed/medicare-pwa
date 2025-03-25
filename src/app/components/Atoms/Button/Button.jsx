import React from "react";

export default function ({ children, className, onClick, data,color='' }) {
  const handleClick = (data) => {
    onClick(data);
  };
  let colorVariant = 'btn-warning'
  if(color){
    colorVariant = color
  }
  return (
    <button
      className={`flex justify-center items-center rounded-lg p-2 ${colorVariant} text-white font-semibold ${className}`}
      onClick={() => handleClick(data)}
    >
      {children}
    </button>
  );
}
