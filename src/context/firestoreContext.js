import React, { useState, useEffect, useContext } from 'react';
import { db } from '../lib/firebase';
import { storage } from '../lib/firebase';
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  setDoc,
  getDoc,
  getDocs,
  increment,
  query,
  where,
  limit,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from './authContext';

const FirebaseContext = React.createContext();

export function useFirestore() {
  return useContext(FirebaseContext);
}

export function FirestoreProvider({ children }) {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const unsubUser = onSnapshot(
        doc(db, 'users', `${currentUser.uid}`),
        (doc) => {
          setUserData(doc.data());
        }
      );

      return () => {
        unsubUser();
      };
    }else{
      setUserData(null)
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, 'posts'),
        where('userId', '==', `${currentUser.uid}`),
        orderBy('dateCreated', 'desc'),
        limit(5)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });

        setUserPosts(posts);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, 'posts'),
        orderBy('dateCreated', 'desc'),
        limit(10)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });

        setTimeline(posts);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  function createUser(uid, username, emailAddress) {
    return setDoc(doc(db, 'users', `${uid}`), {
      userId: uid,
      username: username,
      fullName: '',
      imgSrc: '',
      about: '',
      interests: [],
      followingCount: 0,
      followerCount: 0,
      email: emailAddress.toLowerCase(),
      dateCreated: serverTimestamp(),
    });
  }

  function createPost(userId, caption, imgSrc) {
    const ref = doc(collection(db, 'posts'));

    return setDoc(ref, {
      userId: userId,
      postId: ref.id,
      caption: caption,
      imgSrc: imgSrc,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      dateCreated: serverTimestamp(),
    });
  }

  function updateProfile(userDocId, data) {
    const DocRef = doc(db, 'users', `${userDocId}`);

    return updateDoc(DocRef, data);
  }

  function createFollow(userId, followingId) {
    return addDoc(collection(db, 'follows'), {
      userId: userId,
      following: followingId,
      dateCreated: serverTimestamp(),
    });
  }

  function createLike(userId, postId) {
    const ref = collection(db, 'posts', `${postId}`, 'likes');

    return addDoc(ref, {
      userId: userId,
      postId: postId,
      dateCreated: serverTimestamp(),
    });
  }

  function updatePost(postDocId, data) {
    const DocRef = doc(db, 'posts', `${postDocId}`);

    return updateDoc(DocRef, data);
  }

  async function getUserDoc(userDocId) {
    const docRef = doc(db, 'users', `${userDocId}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async function getUserPosts(userId) {
    const posts = [];

    const q = query(
      collection(db, 'posts'),
      where('userId', '==', `${userId}`),
      orderBy('dateCreated', 'desc'),
      limit(10)
    );

    const snapShot = await getDocs(q);

    snapShot.forEach((doc) => {
      posts.push(doc.data());
    });

    return posts;
  }

  async function isFollowing(userId, followingId) {
    let docId = null;

    const q = query(
      collection(db, 'follows'),
      where('userId', '==', `${userId}`),
      where('following', '==', `${followingId}`),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((doc) => {
      if (doc.exists()) {
        docId = doc.id;
      }
    });

    return docId;
  }

  async function follow(userId, followingId) {
    updateProfile(followingId, {
      followerCount: increment(1),
    });
    updateProfile(userId, {
      followingCount: increment(1),
    });
    createFollow(userId, followingId);
  }

  async function unfollow(userId, followingId, docId) {
    updateProfile(followingId, {
      followerCount: increment(-1),
    });
    updateProfile(userId, {
      followingCount: increment(-1),
    });
    deleteDoc(doc(db, 'follows', `${docId}`));
  }

  async function isLiked(postId, userId) {
    let docId = null;

    const q = query(
      collection(db, 'posts', `${postId}`, 'likes'),
      where('userId', '==', `${userId}`),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((doc) => {
      if (doc.exists()) {
        docId = doc.id;
      }
    });

    return docId;
  }

  async function like(userId, postId) {
    updatePost(postId, {
      likeCount: increment(1),
    });
    createLike(userId, postId);
  }

  async function dislike(postId, docId) {
    updatePost(postId, {
      likeCount: increment(-1),
    });
    deleteDoc(doc(db, 'posts', `${postId}`, 'likes', `${docId}`));
  }

  function createComment(userId, postId, comment, imgSrc) {
    const ref = doc(collection(db, 'posts', `${postId}`, 'comments'));

    return setDoc(ref, {
      userId: userId,
      postId: postId,
      commentId: ref.id,
      comment: comment,
      imgSrc: imgSrc,
      dateCreated: serverTimestamp(),
    });
  }

  async function getComments(postId) {
    const comments = [];

    const q = query(
      collection(db, 'posts', `${postId}`, 'comments'),
      orderBy('dateCreated', 'desc'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((doc) => {
      comments.push(doc.data());
    });

    return comments;
  }

  async function doComment(userId, postId, comment, imgSrc) {
    updatePost(postId, {
      commentCount: increment(1),
    });
    createComment(userId, postId, comment, imgSrc);
  }

  async function getConversation(conversationId){
    const ref = doc(db,'conversations',`${conversationId}`)

    const conversation = await getDoc(ref);

    return conversation.data()
  }

  async function getConversationId(userId1,userId2){

    let conversationId = null;

    const q1 = query(
      collection(db, 'conversations'),
      where('user1','==',`${userId1}`),
      where('user2','==',`${userId2}`),
      limit(1)
    );

    const querySnapshot = await getDocs(q1);

    querySnapshot.docs.forEach((doc) => {
      if(doc.exists()){
        conversationId = doc.id
      }
    });

    if(!conversationId){
      const q2 = query(
        collection(db, 'conversations'),
        where('user1','==',`${userId2}`),
        where('user2','==',`${userId1}`),
        limit(1)
      )
  
      const querySnapshot2 = await getDocs(q2);
  
      querySnapshot2.docs.forEach((doc)=>{
        if(doc.exists()){
          conversationId = doc.id
        }
      })
    }
  
    return conversationId
  }

  async function createConversation(userId1,userId2){

    const ref = doc(collection(db,'converation'));

    addDoc(ref, {
      conversationId: ref.id,
      user1: userId1,
      user2: userId2,
      dateCreated: serverTimestamp(),
    });

    return ref.id
  }

  async function createMessage(conversationId, userId, message, imgSrc){
    const ref = doc(collection(db, 'conversations', `${conversationId}`, 'Messages'));

    return setDoc(ref, {
      userId: userId,
      messageId: ref.id,
      message: message,
      imgSrc: imgSrc,
      dateCreated: serverTimestamp(),
    });
  }

  async function getConversations(userId){

    const conversations = []

    const q = query(
      collection(db,'conversations'),
      where('user1','==',`${userId}`)
    )

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
      const conversationId = doc.id;
      const otherUserId = doc.data().user1 === userId ? doc.data().user2 : doc.data().user1;
      conversations.push({conversationId, otherUserId})
    })

    const q2 = query(
      collection(db,'conversations'),
      where('user2','==',`${userId}`)
    )

    const querySnapshot2 = await getDocs(q2);

    querySnapshot2.forEach((doc)=>{
      const conversationId = doc.id
      const otherUserId = doc.data().user1 === userId ? doc.data().user2 : doc.data().user1;
      conversations.push({conversationId, otherUserId})
    })

    return conversations
  }

  const value = {
    storage,
    userData,
    userPosts,
    timeline,
    createUser,
    getUserDoc,
    updateProfile,
    createPost,
    updatePost,
    getUserPosts,
    doComment,
    getComments,
    isLiked,
    like,
    dislike,
    isFollowing,
    follow,
    unfollow,
    createConversation,
    getConversationId,
    getConversation,
    createMessage,
    getConversations,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
