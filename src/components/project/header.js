import React from 'react';

export default function Header({ name, imgSrc, about, followers }) {
  return (
    <div className="flex w-full p-2 bg-gray-700 justify-center rounded-sm">
      <div className="w-2/3 items-center justify-center">
        <div className="flex items-center py-1">
          <p className="text-white font-base mr-2">{name}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </div>

        <p className="text-white text-xs">{about}</p>
      </div>

      <div className="items-center justify-center">
        <img
          src={imgSrc}
          className="w-12 h-12 object-cover rounded-full"
          alt=""
        />

        <p className="text-white text-sm">
          {followers} {followers > 1 ? 'followers' : 'follower'}
        </p>
      </div>
    </div>
  );
}
