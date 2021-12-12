import React from 'react';

export default function InputField({
  label,
  inputPlaceholder,
  inputValue,
  callback,
}) {
  return (
    <div className="w-full mb-2 p-2 border border-gray-800 rounded">
      <label className="dark:text-white text-xs">{label}</label>
      <input
        aria-label={inputPlaceholder}
        type="text"
        placeholder={inputPlaceholder}
        className="bg-transparent text-sm dark:text-white w-full"
        onChange={({ target }) => {
          callback(target.value);
        }}
        value={inputValue}
      />
    </div>
  );
}
