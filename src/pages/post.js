import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Reply from '../components/post/reply';
import Post from '../components/post/index';
import { useFirestore } from '../context/firestoreContext';
import Comment from '../components/post/comment';
import { onSnapshot, doc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';

export default function PostView() {
  const { postId } = useParams();

  const { setCustomHeader } = useHeader()
  const { setShow } = useNavbar()

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

  useEffect(()=>{
    const customHeader = <span className='flex-1'></span>
    setCustomHeader(customHeader)
    setShow(true);
  },[setCustomHeader,setShow])

  return (
    <>
      {post && (
        <div className="w-full h-full mt-16">
          <Post post={post} />
          <Reply callback={handleComment} />
          {comments.length > 0 &&
            comments.map((comment) => {
              return <Comment key={comment.commentId} comment={comment} />;
            })}
        </div>
      )}
    </>
  );
}
