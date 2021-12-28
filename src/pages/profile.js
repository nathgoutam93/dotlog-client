import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from '../constants/routes';
import { useFirestore } from '../context/firestoreContext';
import { useAuth } from '../context/authContext';
import { db } from '../lib/firebase';
import { onSnapshot, doc } from '@firebase/firestore';
import Chips from '../components/commons/Chips';
import Avatar from '../components/commons/avatar';
const Timeline = lazy(() => import('../components/timeline'));

export default function Profile() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const { userData, userPosts, getUserPosts, isFollowing, follow, unfollow } =
    useFirestore();

  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const { path } = useRouteMatch();
  const [feeds, setFeeds] = useState([]);

  const handleFollow = async () => {
    if (following) {
      await unfollow(currentUser.uid, userId, following);
    } else {
      await follow(currentUser.uid, userId);
    }

    isFollowing(currentUser.uid, user.userId).then((docId) => {
      setFollowing(docId);
    });
  };

  useEffect(() => {
    if (currentUser.uid !== userId) {
      const unsubUser = onSnapshot(doc(db, 'users', `${userId}`), (doc) => {
        setUser(doc.data());
      });

      return () => {
        unsubUser();
      };
    } else {
      setUser(userData);
    }
  }, [userId, currentUser, userData]);

  useEffect(() => {
    if (user) {
      if (user.userId === currentUser.uid) {
        setFeeds(userPosts);
      } else {
        getUserPosts(user.userId).then((posts) => {
          setFeeds(posts);
        });

        isFollowing(currentUser.uid, user.userId).then((docId) => {
          setFollowing(docId);
        });
      }
    }
  }, [user, currentUser, getUserPosts, isFollowing, userPosts]);

  return (
    <>
      {user && (
        <div className="w-full h-full">
          <div className="p-4">
            <Avatar imgSrc={user.imgSrc} />
            <div className="flex items-center">
              <label className="mr-2 text-lg dark:text-white">
                {user.fullName}
              </label>
              <label className="flex-1 text-base text-gray-500">
                @{user.username}
              </label>
              {user.userId === currentUser.uid ? (
                <Link
                  to={ROUTES.UPDATE_PROFILE}
                  className="px-2 py-1 border-black rounded-full dark:text-white border dark:border-white bg-light dark:bg-dark"
                >
                  Edit profile
                </Link>
              ) : (
                <button
                  onClick={handleFollow}
                  className="px-2 py-1 border-black rounded-full dark:text-white border dark:border-white bg-light dark:bg-dark"
                >
                  {following ? `following` : `follow`}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col px-4 mb-2 dark:text-white">
            <div className="flex mb-2">
              <span className="text-base mr-4">
                {user.followingCount} following
              </span>

              <span className="text-base">
                {user.followerCount}
                {user.followerCount > 1 ? ` followers` : ` follower`}
              </span>
            </div>
            <p className="text-sm">{user.about}</p>
          </div>
          <div className="flex px-4 w-full flex-wrap justify-start">
            {user.interests.length > 0 &&
              user.interests.map((interest, index) => {
                return <Chips key={index} label={interest} />;
              })}
          </div>

          <div className="mt-2">
            <div className="flex mb-1 pt-2 justify-around items-center border-b border-light dark:border-dark">
              <NavLink
                activeClassName="activeTab"
                to={`${ROUTES.PROFILE}/${userId}`}
                className="text-gray-600"
                exact
              >
                POSTS
              </NavLink>
              <NavLink
                activeClassName="activeTab"
                to={`${ROUTES.PROFILE}/${userId}/projects`}
                className="text-gray-600"
                exact
              >
                PROJECTS
              </NavLink>
            </div>
          </div>
          <div className="">
            <Suspense fallback={<p>Loading....</p>}>
              <Switch>
                <Route path={`${path}/`} exact>
                  <Timeline feeds={feeds} />
                </Route>
                <Route path={`${path}/projects`} exact>
                  <div className="w-full">
                    {/* {user.projects.map((project) => {
                      return (
                        <Link
                          to={`${ROUTES.PROJECT}/${project.projectId}`}
                          key={project.projectId}
                        >
                          <div className="flex justify-around items-center p-1">
                            <img
                              className="h-12 w-12 my-4 cursor-pointer object-cover rounded-full"
                              src={project.imgSrc}
                              alt=""
                            />
                            <span className="text-base dark:text-white">
                              {project.projectName}
                            </span>
                          </div>
                        </Link>
                      );
                    })} */}
                  </div>
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
