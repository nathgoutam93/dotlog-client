import React, { useState, useEffect } from 'react';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router';
import { useFirestore } from '../context/firestoreContext';
import ChatBubble from '../components/commons/chatBubble';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';
import useGetMessages from '../hooks/getMessages';

export default function Converstation() {
  const { conversationId } = useParams();
  const { userData, getConversation, getUserDoc, createMessage } =
    useFirestore();
  const { setCustomHeader } = useHeader();
  const { setShow } = useNavbar();
  const [customHeader, setHeader] = useState(null);

  const Messages = useGetMessages(conversationId);

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  const [reply, setReply] = useState('');
  const imgSrc = null;

  const Invalid = reply === '';
  const [loading, setLoading] = useState(false);

  const handleSend = (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      createMessage(conversationId, userData.userId, reply, imgSrc);
      setReply('');
    } catch (e) {
      console.log(e.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (Messages) setMessages(Messages);
  }, [Messages]);

  useEffect(() => {
    getConversation(conversationId)
      .then((conversation) => {
        return conversation.user1 === userData.userId
          ? conversation.user2
          : conversation.user1;
      })
      .then((userId) => {
        return getUserDoc(userId);
      })
      .then((userDoc) => {
        setUser(userDoc);
      });
  }, [getConversation, getUserDoc, userData, conversationId]);

  useEffect(() => {
    if (user)
      setHeader(
        <>
          <img
            className="w-8 h-8 mr-2 object-cover rounded-full cursor-pointer"
            src={user.imgSrc}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://avatars.dicebear.com/api/initials/${user.username}.svg`;
            }}
          />
          <div className="flex flex-1 flex-col">
            <span className="text-md font-bold dark:text-light">
              {user.fullName}
            </span>
            <span className="text-xs text-gray-600">{`@${user.username}`}</span>
          </div>
        </>
      );
  }, [user]);

  useEffect(() => {
    setCustomHeader(customHeader);
    setShow(false);
  }, [setCustomHeader, customHeader, setShow]);

  return (
    <>
      {user && (
        <div className="w-full h-full py-4 mt-14">
          <div className="w-full h-full flex flex-col mb-14">
            {messages.map((message) => {
              return (
                <ChatBubble
                  key={message.messageId}
                  userId={message.userId}
                  message={message.message}
                  imgSrc={message.imgSrc}
                  dateCreated={message.dateCreated}
                />
              );
            })}
          </div>
          <form className="fixed bottom-0 flex w-full p-4 justify-around bg-dark lg:w-2/5">
            <input
              className="flex-1 px-2 text-light bg-dark"
              type="text"
              placeholder="write your reply"
              onChange={({ target }) => setReply(target.value)}
              value={reply}
            />

            <svg
              onClick={handleSend}
              disabled={Invalid || loading}
              className="h-6 w-6 cursor-pointer text-light"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </form>
        </div>
      )}
    </>
  );
}
