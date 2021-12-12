import React, { useState, useEffect, useRef } from 'react';
import { useFirestore } from '../../context/firestoreContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Gif from '../commons/gif';
import Picker from 'emoji-picker-react';

export default function Reply({ callback }) {
  const { userData } = useFirestore();
  const { storage } = useFirestore();

  const [reply, setReply] = useState('');

  const filePicker = useRef();
  const [attchment, setAttach] = useState(null);
  const [file, setFile] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const Invalid = reply === '';
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    event.preventDefault();

    setFile(event.target.files[0]);
  };

  const handleFile = () => {
    filePicker.current.click();
    setShowPicker(false);
    setShowGif(false);
  };

  const handleDetach = () => {
    setFile(null);
    setAttach(null);
  };

  const onEmojiClick = (event, emojiObject) => {
    setReply((prevReply) => prevReply + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleShowGif = () => {
    setShowGif(!showGif);
    setShowPicker(false);
    handleDetach();
  };

  const handleGifSelect = (src) => {
    setAttach(src);
    setShowGif(false);
  };

  const handlePost = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL = null) => {
            try {
              callback(userData.userId, reply, downloadURL);
              setReply('');
            } catch (e) {
              console.log(e.message);
            }
          });
        }
      );
    } else {
      try {
        callback(userData.userId, reply, attchment);
        setReply('');
      } catch (e) {
        console.log(e.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setAttach(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <>
      {!progress ? null : (
        <div className="w-full h-1 text-xs flex bg-purple-200">
          <div className="progress flex flex-col shadow-none text-center whitespace-nowrap text-white justify-center bg-purple-500">
            <style>{`.progress{width: ${progress}% ; transition: width 0.3s}`}</style>
          </div>
        </div>
      )}

      <form
        className="flex w-full p-2 justify-around bg-post-light dark:bg-post-dark"
        onSubmit={handlePost}
        method="POST"
      >
        <img
          className="w-8 h-8 object-cover mr-3 rounded-full cursor-pointer"
          src={userData.imgSrc}
          alt=""
        />

        <div className="flex flex-col w-full">
          <textarea
            className="flex-1 px-2 dark:text-white bg-light dark:bg-dark rounded-lg"
            type="text"
            rows="2"
            placeholder="write your reply"
            onChange={({ target }) => setReply(target.value)}
            value={reply}
          />
          {attchment && (
            <div className="relative mt-2 mb-1 h-35 rounded-lg">
              <img
                src={attchment}
                alt=""
                className="max-w-full min-w-full rounded-lg object-cover"
              />
              <svg
                onClick={handleDetach}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 -left-2 h-6 w-6 dark:text-white cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          <div className="flex items-center p-2">
            <div onClick={handleFile}>
              <input
                className="hidden"
                aria-label="profile pic"
                type="file"
                accept="image/*"
                onChange={handleChange}
                ref={filePicker}
              />
              <svg
                className="w-6 h-6 dark:text-white cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <svg
              onClick={() => {
                setShowGif(false);
                setShowPicker(!showPicker);
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 dark:text-white cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              onClick={handleShowGif}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              className="w-6 h-6 dark:text-white cursor-pointer"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M21,13 L21,10 L21,10 L15,3 L4.00276013,3 C2.89666625,3 2,3.89833832 2,5.00732994 L2,27.9926701 C2,29.1012878 2.89092539,30 3.99742191,30 L19.0025781,30 C20.1057238,30 21,29.1017876 21,28.0092049 L21,26 L28.9931517,26 C30.6537881,26 32,24.6577357 32,23.0012144 L32,15.9987856 C32,14.3426021 30.6640085,13 28.9931517,13 L21,13 L21,13 L21,13 Z M20,26 L20,28.0066023 C20,28.5550537 19.5523026,29 19.0000398,29 L3.9999602,29 C3.45470893,29 3,28.5543187 3,28.004543 L3,4.99545703 C3,4.45526288 3.44573523,4 3.9955775,4 L14,4 L14,8.99408095 C14,10.1134452 14.8944962,11 15.9979131,11 L20,11 L20,13 L12.0068483,13 C10.3462119,13 9,14.3422643 9,15.9987856 L9,23.0012144 C9,24.6573979 10.3359915,26 12.0068483,26 L20,26 L20,26 L20,26 Z M15,4.5 L15,8.99121523 C15,9.54835167 15.4506511,10 15.9967388,10 L19.6999512,10 L15,4.5 L15,4.5 Z M11.9945615,14 C10.8929956,14 10,14.9001762 10,15.992017 L10,23.007983 C10,24.1081436 10.9023438,25 11.9945615,25 L29.0054385,25 C30.1070044,25 31,24.0998238 31,23.007983 L31,15.992017 C31,14.8918564 30.0976562,14 29.0054385,14 L11.9945615,14 L11.9945615,14 Z M17,20 L17,22 L14.9998075,22 C14.4437166,22 14,21.5523709 14,21.0001925 L14,17.9998075 C14,17.4437166 14.4476291,17 14.9998075,17 L18,17 L18,16 L15.0048815,16 C13.897616,16 13,16.8865548 13,18.0059191 L13,20.9940809 C13,22.1019194 13.8938998,23 15.0048815,23 L18,23 L18,22.25 L18,22.25 L18,20 L18,19 L15,19 L15,20 L17,20 L17,20 Z M20,17 L20,22 L19,22 L19,23 L22,23 L22,22 L21,22 L21,17 L22,17 L22,16 L19,16 L19,17 L20,17 L20,17 Z M24,19 L24,17 L28,17 L28,16 L23,16 L23,23 L24,23 L24,20 L27,20 L27,19 L24,19 L24,19 Z" />
            </svg>
          </div>
        </div>

        <div className="px-2">
          <button
            className="px-1 dark:text-white bg-light dark:bg-dark rounded-lg"
            type="submit"
            disabled={Invalid || loading}
          >
            Reply
          </button>
        </div>
      </form>
      {showPicker && (
        <Picker pickerStyle={{ width: '80%' }} onEmojiClick={onEmojiClick} />
      )}

      {showGif && <Gif callback={handleGifSelect} />}
    </>
  );
}
