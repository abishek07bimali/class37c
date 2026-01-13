import React from 'react';
import { Link }  from 'react-router-dom';

const Headers = () => {
  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#f5f5f5',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <button className='p-2 bg-red-400 m-2 rounded-lg text-white capitalize '>home</button>
      <button className='p-2 bg-red-400 m-2 rounded-lg text-white capitalize'>about</button>
      <Link to={"/login"} className='p-2 bg-red-400 m-2 rounded-lg text-white capitalize hover:bg-red-600'>login</Link>
      <Link to={"/register"} className='p-2 bg-red-400 m-2 rounded-lg text-white capitalize hover:bg-red-600'>register</Link>
    </div>
  );
};

export default Headers;
