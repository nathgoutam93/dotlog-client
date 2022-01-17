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
        <div className="fixed top-0 flex py-4 px-2 w-full items-center bg-post-light dark:bg-post-dark lg:w-2/5">
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
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 ml-2 mr-2 dark:text-white cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
        </div>
      )}
    </>
  );
}
