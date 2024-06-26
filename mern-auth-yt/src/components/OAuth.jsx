import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { baseAPI } from '../utils';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await baseAPI.post('/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      // const data = await res.json();
      const data = res.data;
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleAuthClick}
      className='text-white bg-red-700 p-3 rounded-lg uppercase hover:opacity-95 '
    >
      Continue with Google
    </button>
  );
}
