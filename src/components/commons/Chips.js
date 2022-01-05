import React from 'react';

export default function Chips({ label }) {
  return (
    <div className="flex items-center m-1 px-4 py-2 text-sm rounded-full dark:text-white bg-post-light dark:bg-post-dark">
      <label>{label}</label>
    </div>
  );
}
