import React, { useState, useEffect } from 'react';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from '../constants/routes';
import { useFirestore } from '../context/firestoreContext';
import { useAuth } from '../context/authContext';

const Project = lazy(() => import('../pages/project'));
const Explore = lazy(() => import('../components/projectTimeline'));

export default function Projects() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);

  const { path, url } = useRouteMatch();

  return (
    <div className="flex h-screen">
      <div className="w-1/5 h-full p-2 overflow-y-scroll">
        <div className="flex flex-col justify-center items-center bg-post-light dark:bg-post-dark rounded-md">
          {currentUser ? (
            <>
              <NavLink
                to={ROUTES.PROJECTS}
                className="bg-light dark:bg-dark"
                exact
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 my-4 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </NavLink>

              {projects.map((project) => {
                return (
                  <Link
                    to={`${url}/${project.projectId}`}
                    key={project.projectId}
                  >
                    <img
                      className="h-12 w-12 my-4 cursor-pointer object-cover rounded-full"
                      src={project.imgSrc}
                      alt=""
                    />
                  </Link>
                );
              })}

              <Link
                to={ROUTES.NEW_PROJECT}
                className="bg-light dark:bg-dark"
                exact
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 my-4 cursor-pointer"
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
              </Link>
            </>
          ) : null}
        </div>
      </div>

      <div className="w-4/5 h-full py-2 overflow-y-scroll">
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <Route path={`${path}/`} exact component={Explore} />
            <Route path={`${path}/:projectId`} component={Project} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
