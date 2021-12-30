import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Reply from '../components/post/reply';
import Post from '../components/post/index';
import { useFirestore } from '../context/firestoreContext';
import Comment from '../components/post/comment';
import { onSnapshot, doc } from '@firebase/firestore';
import { db } from '../lib/firebase';

export default function PostView() {
  const { postId } = useParams();

  const { doComment, getComments } = useFirestore();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const handleComment = (userId, comment, imgSrc) => {
    doComment(userId, postId, comment, imgSrc);
  };

  useEffect(() => {
    const docRef = doc(db, 'posts', `${postId}`);

    const unsubPost = onSnapshot(docRef, (doc) => {
      setPost(doc.data());
    });

    getComments(postId).then((docs) => {
      setComments(docs);
    });

    return () => {
      unsubPost();
    };
  }, [postId, getComments]);

  return (
    <>
      {post && (
        <div className="w-full h-full">
          <Post post={post} />
          <Reply callback={handleComment} />
          {comments.length > 0 &&
            comments.map((comment,index) => {
              return <Comment key={index} comment={comment} />;
            })}
        </div>
      )}
    </>
  );
}
