import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
export default function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
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