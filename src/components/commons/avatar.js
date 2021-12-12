import React from 'react';

export default function Avatar({ imgSrc }) {
  return (
    <img src={imgSrc} className="h-32 w-32 rounded-full object-cover" alt="" />
  );
}
