import React, { useEffect, useRef } from 'react';
import Timeline from '../components/timeline';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { timeline } = useFirestore();
  const { setCustomHeader } = useHeader();
  const { setShow } = useNavbar();

  const inputEl = useRef(null);

  const handleFocus = () => {
    inputEl.current.focus();
  };

  useEffect(() => {
    const customHeader = (
      <div
        className="flex flex-1 p-1 mr-2 rounded-3xl bg-light dark:bg-dark dark:text-gray-700 cursor-text"
        onClick={handleFocus}
      >
        <svg
          onClick={handleFocus}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 cursor-text"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          className="flex-1 bg-light dark:bg-dark dark:text-white outline-none"
          type="text"
          placeholder="search"
          ref={inputEl}
        />
      </div>
    );
    setCustomHeader(customHeader);
    setShow(true);
  }, [setCustomHeader, setShow]);

  return (
    <div className="w-full h-full mt-14">
      {currentUser && <Timeline feeds={timeline} />}
    </div>
  );
}
