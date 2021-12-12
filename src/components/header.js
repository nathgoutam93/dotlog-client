import React, { useState, useRef } from 'react';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';

export default function Header({ show }) {
  const { currentUser, logOut } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [dark, setDark] = useState(true);

  const inputEl = useRef(null);

  const handleFocus = () => {
    inputEl.current.focus();
  };

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

  const handleLogOut = () => {
    logOut();
  };

  return (
    <>
      {currentUser && (
        <div
          className={`sticky ${
            show ? `top-0` : `-top-20`
          } flex py-4 px-2 w-full items-center bg-post-light dark:bg-post-dark`}
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

          <Switch>
            <Route path={ROUTES.DASHBOARD} exact>
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
              </Link>
            </Route>
            <Route path={ROUTES.PROJECTS}>
              <p className="flex-1 text-base font-bold dark:text-white">
                Projects
              </p>
            </Route>
            <Route path={ROUTES.UPDATE_PROFILE}>
              <p className="flex-1 text-base font-bold dark:text-white">
                Edit Profile
              </p>
            </Route>
            <Route path={ROUTES.NEW_POST}>
              <p className="flex-1 text-base font-bold dark:text-white">
                Share post
              </p>
            </Route>
            <Route path={ROUTES.NOTIFICATION}>
              <p className="flex-1 text-base font-bold dark:text-white">
                Notifications
              </p>
            </Route>
            <Route path={ROUTES.MESSAGES}>
              <p className="flex-1 text-base font-bold dark:text-white">
                Messages
              </p>
            </Route>
            <Route path={ROUTES.PROFILE}>
              <span className="flex-1"></span>
              <svg
                onClick={handleLogOut}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 dark:text-white cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Route>
            <span className="flex-1"></span>
          </Switch>

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
