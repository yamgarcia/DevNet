import React from "react";

export const NotFound = () => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page doesn't exist</p>
    </>
  );
};

export default NotFound;
