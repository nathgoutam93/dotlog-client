import React, { useState, useEffect, useRef } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { formatRelative } from 'date-fns';
import Skeleton from '../commons/Skeleton';
import { useIntersection } from '../../hooks/intersectionObserver';
import { useFirestore } from '../../context/firestoreContext';

export default function Comment({ comment }) {
  const imgRef = useRef(null);
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
    if (userData.userId !== comment.userId) {
      getUserDoc(comment.userId).then((doc) => {
        setUser(doc);
      });
    } else {
      setUser(userData);
    }
  }, [comment, getUserDoc, userData]);

  return (
    <>
      {comment && user && (
        <div className='px-4 w-full mb-2 flex items-baseline'>
          <img
            className="w-8 h-8 mr-2 object-cover rounded-full cursor-pointer"
            src={user.imgSrc}
            alt=""
            onError={(e)=>{e.target.onerror = null; e.target.src=`https://avatars.dicebear.com/api/initials/${user.username}.svg`}}
          />
          <div className='max-w-max flex flex-col'>
            <div className='p-2 rounded-3xl bg-light'>
              <Link to={`${ROUTES.PROFILE}/${user.userId}`} className='p-2 mb-2'>
                <span className='text-base font-bold mr-2'>{user.fullName}</span>
                <span className='text-xs text-gray-600'>{`@${user.username}`}</span>
              </Link>
              <p className='p-2'>{comment.comment}</p>
              {comment.imgSrc && <div className="p-2 items-center justify-center" ref={imgRef}>
                {inView && (
                  <img
                    className="my-2 max-w-full min-w-full rounded-xl"
                    src={comment.imgSrc}
                    alt=""
                    onLoad={handleLoad}
                  />
                )}
                {!load && <Skeleton />}
            </div>}
            </div>
            <span className='w-max px-1 mt-2 text-xs dark:text-light'>{formatRelative(new Date(comment.dateCreated.seconds*1000), new Date())}</span>
          </div>
        </div>
      )}
    </>
  );
}
