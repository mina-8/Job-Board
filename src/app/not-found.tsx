import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-3">
      <h1 className="font-bold text-2xl text-blue-500">Job Board</h1>
      <p className="font-semibold text-xl text-blue-400">
        We're sorry, but what you're searching for isn't here!
      </p>
      <p className="capitalize text-lg text-red-500">Not Found</p>
    </div>
  );
};

export default NotFound;