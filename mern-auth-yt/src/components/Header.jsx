import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt='profile'
                className='h-7 w-7 rounded-full object-cover'
              />
            ) : (
              <li>SignIn</li>
            )}
          </Link>
          {/* <Link>
            <a href="/signup">Sign Up</a>
          </Link> */}
        </ul>
      </div>
    </div>
  );
}
