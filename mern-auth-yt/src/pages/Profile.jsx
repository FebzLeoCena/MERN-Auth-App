import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfailure,
  signOut,
  updateUserStart,
  updateUserSuccess,
  updateUserfailure,
} from '../redux/user/userSlice';
import { baseAPI } from '../utils';

export default function Profile() {
  const [img, setImg] = useState(undefined);
  const [imgUploadPercentage, setImgUploadPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(formData);
  console.log('imgUploadPercentage', imgUploadPercentage);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (img) {
      handleFileUpload(img);
    }
  }, [img]);
  const handleFileUpload = async (image) => {
    console.log('image', image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log('Upload is ' + progress + '% done');
        setImgUploadPercentage(progress);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await baseAPI.post(
        `/user/update/${currentUser._id}`,
        formData
      );
      const data = response.data;
      // const res = await fetch(
      //   `http://localhost:3001/api/user/update/${currentUser._id}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData),
      //   }
      // );
      // const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserfailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserfailure(err));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await baseAPI.delete(`/user/delete/${currentUser._id}`);
      const data = response.data;
      console.log('DeleteResponse', response);
      if (response.status !== 200) {
        console.log('DeleteResponse0', data);
        dispatch(deleteUserfailure(data));
        return;
      }
      console.log('DeleteResponse1', data);
      dispatch(deleteUserSuccess());
    } catch (err) {
      dispatch(deleteUserfailure(err));
    }
  };
  const handleSignOut = async () => {
    try {
      await baseAPI.get('/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mx-auto p-3 max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImg(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt={currentUser.username}
          className='h-24 w-24 self-center cursor-pointer object-cover rounded-full mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (File size must be less than 2 MB)
            </span>
          ) : imgUploadPercentage > 0 && imgUploadPercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading : ${imgUploadPercentage} %`}</span>
          ) : imgUploadPercentage === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 rounded-lg p-3'
          autoComplete='username'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 rounded-lg p-3'
          autoComplete='current-password'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteAccount}
        >
          Delete Account?
        </span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully'}
      </p>
    </div>
  );
}
