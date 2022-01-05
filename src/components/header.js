import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useHeader } from '../context/headerContext';

export default function Header() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [dark, setDark] = useState(true);

  const { customHeader } = useHeader();

  const handleBack = () => {
    history.goBack();
  };

  const handleDark = () => {
    if (dark) {
      window.document.documentElement.classList.remove('dark');
    } else {
      window.document.documentElement.classList.add('dark');
    }

    setDark(!dark);
  };

  return (
    <>
      {currentUser && (
        <div
          className="fixed top-0 flex py-4 px-2 w-full items-center bg-post-light dark:bg-post-dark lg:w-2/5"
        >
          {location.pathname === ROUTES.DASHBOARD ? (
            <p className="mx-2 text-base font-bold dark:text-white">Home</p>
          ) : (
            <svg
              onClick={handleBack}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 ml-2 mr-2 dark:text-white cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {customHeader}

          <svg
            onClick={handleDark}
            className="h-6 w-6 mr-2 dark:text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </>
  );
}
