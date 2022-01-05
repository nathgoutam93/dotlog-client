import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ChipsWithIcon from '../components/commons/ChipsWithIcon';
import Avatar from '../components/commons/avatar';
import { useHeader } from '../context/headerContext';
import { useNavbar } from '../context/navbarContext';

export default function UpdateProfile() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { storage, userData, updateProfile } = useFirestore();

  const { setCustomHeader } = useHeader();
  const { setShow } = useNavbar();

  const [user, setUser] = useState(null);

  const filePicker = useRef();
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [fullName, setFullName] = useState('');
  const [about, setAbout] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [interests, setInterests] = useState([]);

  const isInvalid = fullName === '';
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    filePicker.current.click();
  };

  const handleFile = (event) => {
    event.preventDefault();

    setFile(event.target.files[0]);
  };

  const RemoveInterest = (id) => {
    const removedList = interests.filter((_, index) => {
      return index !== id;
    });
    setInterests(removedList);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    setLoading(true);

    if (file) {
      const storageRef = ref(storage, `users/${user.username}`);
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            try {
              updateProfile(currentUser.uid, {
                userId: currentUser.uid,
                fullName: fullName,
                imgSrc: downloadURL,
                about: about,
                interests: interests,
              }).then(() => {
                history.push(`${ROUTES.PROFILE}/${currentUser.uid}`);
              });
            } catch (error) {
              console.log(error.message);
            }
          });
        }
      );
    } else {
      try {
        updateProfile(currentUser.uid, {
          userId: currentUser.uid,
          fullName: fullName,
          about: about,
          interests: interests,
        }).then(() => {
          history.push(`${ROUTES.PROFILE}/${currentUser.uid}`);
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      setUser(userData);
    }
  }, [userData, currentUser]);

  useEffect(() => {
    if (user) {
      setImgSrc(user.imgSrc);
      setFullName(user.fullName);
      setAbout(user.about);
      setInterests(user.interests);
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImgSrc(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(()=>{

    const customHeader = <p className="flex-1 text-base font-bold dark:text-white">Edit Profile</p>

    setCustomHeader(customHeader)
    setShow(true);
  },[setCustomHeader, setShow])

  return (  
    <div className="mt-14 w-full flex flex-col items-center justify-center">
      {!progress ? null : (
        <div className="w-full h-1 text-xs flex bg-purple-200">
          <div className="progress flex flex-col shadow-none text-center whitespace-nowrap text-white justify-center bg-purple-500">
            <style>{`.progress{width: ${progress}%}`}</style>
          </div>
        </div>
      )}
      <div className='flex w-full p-4 justify-around items-baseline'>
      <div
        className="mt-4 relative h-32 w-32 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <Avatar imgSrc={imgSrc} username={userData.username}/>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-3 right-1 h-6 w-6 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <input
          className="hidden"
          aria-label="profile pic"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFile}
          ref={filePicker}
        />
      </div>
      <button 
        disabled={isInvalid || loading}
        onClick={handleUpdate}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
        Save changes
      </button>
      </div>
      <form className="w-full p-4" onSubmit={handleUpdate} method="POST">
        <div className='relative mb-4 p-2 flex flex-col border border-gray-500 rounded-xl'>
          <label className="absolute -top-2 bg-post-light dark:bg-post-dark dark:text-white text-xs">Name</label>
          <input
            type="text"
            placeholder="your full Name"
            className="p-2 bg-transparent text-sm dark:text-white"
            onChange={(e)=>setFullName(e.target.value)}
            value={fullName}
          />
        </div>
        <div className='relative mb-4 p-2 flex flex-col border border-gray-500 rounded-xl'>
          <label className="absolute -top-2 bg-post-light dark:bg-post-dark dark:text-white text-xs">Bio</label>
          <textarea
          placeholder='let us know you'
          className='p-2 bg-transparent text-sm dark:text-white'
          onChange={(e)=>setAbout(e.target.value)}
          value={about}
          />
        </div>
  
        <div className="w-full mb-2 p-2">
          <label className="dark:text-white text-xs">Interests</label>
          <div className="flex items-center mb-1">
            <input
              aria-label="interests"
              type="text"
              placeholder="eg: music"
              className="mr-1 bg-transparent text-sm dark:text-white"
              onChange={({ target }) => setNewInterest(target.value)}
              value={newInterest}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer dark:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => {
                if (newInterest !== '') {
                  setInterests([...interests, newInterest.trim()]);
                  setNewInterest('');
                }
              }}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex w-full flex-wrap justify-start">
            {interests?.length > 0 &&
              interests.map((interest, index) => {
                return (
                  <ChipsWithIcon
                    key={index}
                    label={interest}
                    id={index}
                    callback={RemoveInterest}
                  />
                );
              })}
          </div>
        </div>
      </form>
    </div>
  );
}
