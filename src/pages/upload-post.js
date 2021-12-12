import React from 'react';
import PostUpload from '../components/postUpload';
import { useAuth } from '../context/authContext';

export default function UploadPost() {
  const { currentUser } = useAuth();
  return <div className="w-full h-full">{currentUser && <PostUpload />}</div>;
}
