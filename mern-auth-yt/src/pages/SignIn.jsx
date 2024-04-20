import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(error);
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setError(false);

      console.log('jjj', data, error);
      if (data.success == false) {
        console.log('jjja', data, error);
        setError(true);
      }
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95'
        >
          {/* <button className='bg-red-700 rounded-lg p-3 text-white uppercase hover:opacity-95'>
          Sign In
        </button> */}
          {loading ? 'Loading...' : 'SignIn'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className=' text-blue-600'>Sign up</span>
        </Link>
      </div>
      <p className=' text-red-600'>{error ? 'Something went wrong' : ''}</p>
    </div>
  );
}
