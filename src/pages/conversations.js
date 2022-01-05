import React, { useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';

export default function Conversations() {

  const { currentUser } = useAuth()

  const { getConversations } = useFirestore();

  const [conversations, setConversation] = useState([])

  const { setCustomHeader } = useHeader();
  const { setShow } = useNavbar();

  useEffect(()=>{
    getConversations(currentUser.uid).then((docs)=>{
      setConversation(docs)
    })
  },[currentUser, getConversations])

  useEffect(()=>{
    const customHeader = <p className="flex-1 text-base font-bold dark:text-white">Messages</p>

    setCustomHeader(customHeader)
    setShow(true)
  },[setCustomHeader, setShow])

  return (
    <div className="w-full h-full p-4 mt-14">
      {conversations.map((conversation)=>{
        return <Conversation key={conversation.conversationId} conversationId={conversation.conversationId} userId={conversation.otherUserId}/>
      })}
    </div>
  );
}

function Conversation({conversationId, userId}){

  const { getUserDoc } = useFirestore()

  const [user, setUser] = useState(null)

  useEffect(()=>{
    getUserDoc(userId).then((doc)=>{
      setUser(doc)
    })
  },[userId, getUserDoc])

  return (
    <>
    {user && <Link to={`${ROUTES.CONVERSATION}/${conversationId}`}
    className='my-1 px-4 py-2 flex items-center'>
      <img
        className="h-12 w-12 mr-4 object-cover rounded-full cursor-pointer"
        src={user.imgSrc}
        alt=""
      />
      <span className="mr-2 dark:text-white text-xl font-bold">
        {user.fullName}
      </span>
      <span className="text-gray-500 text-sm truncate">{`@${user.username}`}</span>
    </Link>}
    </>
  )
}