import React, { useState, useEffect, useRef } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Header from './header';
import Action from './action';
import { useIntersection } from '../../hooks/intersectionObserver';
import Skeleton from '../commons/Skeleton';
import { useFirestore } from '../../context/firestoreContext';

export default function Post({ post }) {
  const imgRef = useRef(null);
  const { userData, getUserDoc } = useFirestore();

  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  const [inView, setInView] = useState(false);

  useIntersection(imgRef, () => {
    setInView(true);
  });

  const handleLoad = () => {
    setLoad(true);
  };

  useEffect(() => {
    if (userData?.userId !== post.userId) {
      getUserDoc(post.userId).then((doc) => {
        setUser(doc);
      });
    } else {
      setUser(userData);
    }
  }, [post, userData, getUserDoc]);

  return (
    <>
      {post && (
        <div className="flex flex-col w-full py-2 border-b border-light dark:border-dark bg-post-light dark:bg-post-dark">
          {user && (
            <Header
              userId={post.userId}
              userImg={user.imgSrc}
              fullName={user.fullName}
              userName={user.username}
              timeStamp={post.dateCreated}
            />
          )}

          <Link to={`${ROUTES.Post}/${post.postId}`}>
            <p className="dark:text-white text-sm mb-2 px-4">{post.caption}</p>

            {post.imgSrc && (
              <div className="p-2 items-center justify-center" ref={imgRef}>
                {inView && (
                  <img
                    className="min-w-full max-w-full rounded-xl"
                    src={post.imgSrc}
                    alt=""
                    onLoad={handleLoad}
                  />
                )}
                {!load && <Skeleton />}
              </div>
            )}
          </Link>

          <Action post={post} />
        </div>
      )}
    </>
  );
}
