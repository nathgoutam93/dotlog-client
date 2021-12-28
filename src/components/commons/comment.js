import React, { useState, useEffect, useRef } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Header from './header';
import Skeleton from './Skeleton';
import { useIntersection } from '../../hooks/intersectionObserver';
import { useFirestore } from '../../context/firestoreContext';
import { useAuth } from '../../context/authContext';

export default function Comment({ comment }) {
  const imgRef = useRef(null);
  const { currentUser } = useAuth();
  const { userData, getUserDoc } = useFirestore();

  const [user, setUser] = useState(null);
  const [inView, setInView] = useState(false);
  const [load, setLoad] = useState(false);

  useIntersection(imgRef, () => {
    setInView(true);
  });

  const handleLoad = () => {
    setLoad(true);
  };

  useEffect(() => {
    if (currentUser.uid !== comment.userId) {
      getUserDoc(comment.userId).then((doc) => {
        setUser(doc);
      });
    } else {
      setUser(userData);
    }
  }, [currentUser, comment, getUserDoc, userData]);

  return (
    <>
      {comment && (
        <div className="flex flex-col w-full py-2 border-b border-t border-light dark:border-dark bg-post-light dark:bg-post-dark">
          {user && (
            <Header
              userId={comment.userId}
              userImg={user.imgSrc}
              fullName={user.fullName}
              userName={user.username}
              timeStamp={comment.dateCreated}
            />
          )}

          <Link to={`${ROUTES.Post}/${comment.postId}`}>
            <p className="dark:text-white text-sm my-1 px-4">
              {comment.comment}
            </p>

            {comment.imgSrc && (
              <div className="p-2 items-center justify-center" ref={imgRef}>
                {inView && (
                  <img
                    className="min-w-full max-w-full rounded-xl"
                    src={comment.imgSrc}
                    alt=""
                    onLoad={handleLoad}
                  />
                )}
                {!load && <Skeleton />}
              </div>
            )}
          </Link>
        </div>
      )}
    </>
  );
}
