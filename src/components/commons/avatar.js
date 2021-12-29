import React from 'react';

export default function Avatar({ imgSrc, username }) {
  return (
    <img 
    src={imgSrc} 
    className="h-32 w-32 rounded-full object-cover" 
    alt="" 
    onError={(e)=>{e.target.onerror = null; e.target.src=`https://avatars.dicebear.com/api/initials/${username}.svg`}}/>
  );
}
