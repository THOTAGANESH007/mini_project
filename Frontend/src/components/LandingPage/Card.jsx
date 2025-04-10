import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="card">
      {/* <div> */}
        <img style={{height:"100%",borderRadius:"10px"}}  src='https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-cover'></img>
      {/* </div> */}
    </div>
  );
};

export default Card;
