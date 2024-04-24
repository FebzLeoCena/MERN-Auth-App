import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import { baseAPI } from '../utils';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { error, loading } = useSelector((state) => state.user); //The selector function takes the entire Redux store state as its argument and returns the specific piece of data that you want from that state. Whenever the Redux store state changes, React Redux will re-run the selector function to get the new value of the selected data.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // Clear error state when component unmounts
    return () => {
      dispatch(signInFailure(null));
    };
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true);
      dispatch(signInStart());
      await baseAPI
        .post('/auth/signin', formData)
        .then((response) => {
          // if (!response.data.success && response.status === 404) {
          //   console.log('User not found');
          //   dispatch(signInFailure({ message: 'User not Found' }));
          //   return;
          // }
          console.log('KGF0');
          if (!response.data.success) {
            console.log('Other error occurred:', response.data.message);
            dispatch(signInFailure(response.data));
            return;
          }

          dispatch(signInSuccess(response.data));
          navigate('/');
        })
        .catch((e) => {
          if (e.response.status === 404) {
            console.log('KGF');
          }
        });
      // console.log(response);
      // const res = await fetch('http://localhost:3001/api/auth/signin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await res.json();

      // console.log('test1', data, error);
    } catch (err) {
      // Handle other errors
      console.error('Error occurred:', err);
      dispatch(signInFailure(err));
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
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className=' text-blue-600'>Sign up</span>
        </Link>
      </div>
      <p className=' text-red-600'>
        {error ? error.message || 'Something went wrong' : ''}
      </p>
    </div>
  );
}
