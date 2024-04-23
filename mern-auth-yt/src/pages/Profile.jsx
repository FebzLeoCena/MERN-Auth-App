import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export default function Profile() {
  const [img, setImg] = useState(undefined);
  const [imgUploadPercentage, setImgUploadPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log('imgUploadPercentage', imgUploadPercentage);

  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
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

  return (
    <div className='mx-auto p-3 max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImg(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
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
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 rounded-lg p-3'
          autoComplete='username'
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 rounded-lg p-3'
          autoComplete='current-password'
        />
        <button className='bg-slate-700 text-white p-3 rouded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account?</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
