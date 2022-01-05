import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Timeline from '../components/Timelines/timeline';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { useHeader } from '../context/headerContext';
import * as ROUTES from '../constants/routes'
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


  useEffect(()=>{
  const customHeader = (<>
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
    <Link to={ROUTES.MESSAGES}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2 dark:text-white cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
    </Link></>)
    setCustomHeader(customHeader)
    setShow(true);
  },[setCustomHeader,setShow])

  return (
    <div className="w-full h-full mt-14">
      {currentUser && <Timeline feeds={timeline} />}
    </div>
  );
}
