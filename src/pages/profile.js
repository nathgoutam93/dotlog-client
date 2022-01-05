import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from '../constants/routes';
import { useFirestore } from '../context/firestoreContext';
import { db } from '../lib/firebase';
import { onSnapshot, doc } from '@firebase/firestore';
import Chips from '../components/commons/Chips';
import Avatar from '../components/commons/avatar';
import { useHistory } from 'react-router';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';
import { useAuth } from '../context/authContext';
const Timeline = lazy(() => import('../components/Timelines/timeline'));

export default function Profile() {
  const { userId } = useParams();
  const { logOut } = useAuth();
  const { 
    userData, userPosts, getUserPosts, 
    isFollowing, follow, unfollow, 
    getConversationId, createConversation,
  } = useFirestore();

  const history = useHistory();
  
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const { path } = useRouteMatch();
  const [feeds, setFeeds] = useState([]);
  
  const { setCustomHeader } = useHeader();
  const { setShow } = useNavbar();
  
  const handleFollow = async () => {
    if (following) {
      await unfollow(userData.userId, userId, following);
    } else {
      await follow(userData.userId, userId);
    }

    isFollowing(userData.userId, user.userId).then((docId) => {
      setFollowing(docId);
    });
  };

  const handleMessage = async () => {

    const conversationId = await getConversationId(userId, userData.userId);

    if(conversationId){
      history.push(`${ROUTES.CONVERSATION}/${conversationId}`)
    }else{
      const { conversationId } = await createConversation(userData.userId, userId);
      history.push(`${ROUTES.CONVERSATION}/${conversationId}`)
    }
  }

  useEffect(() => {
    if (userData.userId !== userId) {
      const unsubUser = onSnapshot(doc(db, 'users', `${userId}`), (doc) => {
        setUser(doc.data());
      });

      return () => {
        unsubUser();
      };
    } else {
      setUser(userData);
    }
  }, [userId, userData]);

  useEffect(() => {
    if (user) {
      if (user.userId === userData.userId) {
        setFeeds(userPosts);
      } else {
        getUserPosts(user.userId).then((posts) => {
          setFeeds(posts);
        });

        isFollowing(userData.userId, user.userId).then((docId) => {
          setFollowing(docId);
        });
      }

    }
  }, [ userData, user, getUserPosts, isFollowing, userPosts]);

  useEffect(()=>{

    const handleLogOut = () => {
      logOut();
    };

    const customHeader = user && (<>
      <span className='flex-1 text-lg font-bold dark:text-light'>{user.fullName}</span>
      {userData.userId === userId && <svg
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
      </svg>}
      </>)

    setCustomHeader(customHeader);
    setShow(true);
  },[user, userData, userId, setCustomHeader, logOut, setShow])

  return (
    <>
      {user && (
        <div className="w-full h-full mt-14 bg-light dark:bg-dark">
          <div className='mb-6 p-4 pb-6 flex justify-around rounded-b-3xl bg-post-light dark:bg-post-dark shadow-lg'>
            <div className="flex flex-col">
              <Avatar imgSrc={user.imgSrc} username={userData.username}/>
              <div className='mt-2 flex items-center justify-between space-x-4 dark:text-light'>
                <div className="flex flex-col">
                  <label className="text-base font-bold text-center">
                    {user.followingCount}
                  </label>
                  <label className='text-base'>
                    following
                  </label>
                </div>
                <div className="flex flex-col">
                  <label className="text-base font-bold text-center">
                    {user.followerCount}
                  </label>
                  <label className='text-base'>
                    {user.followerCount > 1 ? ` followers` : ` follower`}
                  </label>
                </div>
              </div>
            </div>
            <div className="ml-4 flex flex-col flex-1">
              <label className="text-lg dark:text-light">
                {user.fullName}
              </label>
              <label className="text-base text-gray-500">
                @{user.username}
              </label>
              <p className="w-3/4 text-sm mt-2 dark:text-white">{user.about}</p>
              <div className='h-auto mt-4 flex space-x-2 dark:text-light'>
                {user.userId === userData.userId ? (
                    <Link
                      to={ROUTES.UPDATE_PROFILE}
                      className="px-2 py-2 rounded-xl bg-green-500"
                    >
                      Edit profile
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={handleFollow}
                        className="px-2 py-2 rounded-xl bg-green-500"
                      >
                        {following ? `following` : `follow`}
                      </button>
                    {following? 
                      (<button
                        onClick={handleMessage}
                        className="px-2 py-2 rounded-xl bg-green-500"
                      >
                        Message
                      </button>):null}
                    </>
                  )}
              </div>
            </div>         
          </div>

          <div className="my-2 px-4 w-full flex flex-wrap justify-start">
            {user.interests.length > 0 &&
              user.interests.map((interest, index) => {
                return <Chips key={index} label={interest} />;
              })}
          </div>

          <div className="mb-4 pt-2 flex justify-around items-center">
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
      )}
    </>
  );
}
