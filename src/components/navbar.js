import React from 'react';
import * as ROUTES from '../constants/routes';
import { Link, NavLink } from 'react-router-dom';
import { useFirestore } from '../context/firestoreContext'

export default function Navbar({ show }) {
  const { userData } = useFirestore()

  return (
    <>
      {userData && (
        <nav
          className={`fixed ${
            show ? 'bottom-2' : '-bottom-20'
          } mx-5 my-2 p-2 flex items-center justify-center rounded-3xl z-50 bg-dark`}
        >
          <NavLink activeClassName={"activePage"} to={ROUTES.DASHBOARD} className="text-gray-600" exact>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mr-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </NavLink>

          <NavLink activeClassName={"activePage"} to={ROUTES.PROJECTS} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mr-4 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </NavLink>

          <NavLink activeClassName={"activePage"} to={ROUTES.NEW_POST} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </NavLink>

          <NavLink activeClassName={"activePage"} to={ROUTES.NOTIFICATION} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mr-4 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </NavLink>

          <Link to={`${ROUTES.PROFILE}/${userData.userId}`}>
            <img
              src={userData.imgSrc}
              className="w-12 h-12 object-cover rounded-full"
              alt=""
              onError={(e)=>{e.target.onerror = null; e.target.src=`https://avatars.dicebear.com/api/initials/${userData.username}.svg`}}
            />
          </Link>
        </nav>
      )}
    </>
  );
}
