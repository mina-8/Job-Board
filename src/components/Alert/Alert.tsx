import React, { useEffect, useState } from 'react';

const Alert = ({ message , triger }: { message: string , triger: number}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [triger]);


  return (
    <div
      className={`absolute text-white  right-1/2 translate-x-1/2 my-5 bg-red-500 p-2 rounded-md transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 top-5' : 'opacity-0 -top-16'} `}
    
    >
      {message}
    </div>
  );
};

export default Alert;