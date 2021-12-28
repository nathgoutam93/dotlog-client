import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../context/firestoreContext';

export default function Action({ post }) {
  const { userData, isLiked, like, dislike } = useFirestore();
  const [postLiked, setPostLiked] = useState(false);
  const [likeDoc, setLikeDoc] = useState(null);

  const handleLike = async () => {
    setPostLiked(true);
    await like(userData.userId, post.postId);
    isLiked(post.postId, userData.userId).then((docId) => {
      setLikeDoc(docId);
    });
  };

  const handleDislike = () => {
    if (likeDoc) {
      setPostLiked(false);
      setLikeDoc(null);
      dislike(post.postId, likeDoc);
    }
  };

  const handleComment = () => {};

  const handleShare = () => {};

  useEffect(() => {
    isLiked(post.postId, userData.userId).then((doc) => {
      setLikeDoc(doc);
      if (doc) {
        setPostLiked(true);
      }
    });
  }, [isLiked,post,userData]);

  return (
    <div className="flex items-center justify-around">
      <div className="flex w-1/3 items-center justify-center">
        {postLiked ? (
          <svg
            onClick={handleDislike}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        ) : (
          <svg
            onClick={handleLike}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        )}
        <label className="ml-2 text-base dark:text-white">
          {post.likeCount}
        </label>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <svg
          onClick={handleComment}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <label className="ml-2 text-base dark:text-white">
          {post.commentCount}
        </label>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <svg
          onClick={handleShare}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <label className="ml-2 text-base dark:text-white">
          {post.shareCount}
        </label>
      </div>
    </div>
  );
}
