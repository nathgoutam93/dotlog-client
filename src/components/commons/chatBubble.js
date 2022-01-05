import React from 'react'
import { formatRelative } from 'date-fns';
import { useFirestore } from '../../context/firestoreContext';

export default function ChatBubble({userId, message, imgSrc, dateCreated}) {

    const { userData } = useFirestore();

    return (
        <>
        {userId === userData.userId? 
        (<div className='px-4 w-full mb-2 flex flex-row-reverse'>
            <div className='w-3/4 flex flex-col items-end'>
                <div className='p-2 rounded-tr-3xl rounded-l-3xl bg-blue-600 text-light'>
                    <p className='p-2'>{message}</p>
                    {imgSrc && <img
                        className="mt-2 min-w-full max-w-full rounded-xl"
                        src={imgSrc}
                        alt=""
                        />
                    }
                </div>
                {dateCreated && <span className='w-max px-1 mt-2 text-xs dark:text-light'>{formatRelative(new Date(dateCreated.seconds*1000), new Date())}</span>}
            </div>
        </div>):
        (<div className='px-4 w-full mb-2 flex items-end'>
            <div className='w-3/4 flex flex-col'>
                <div className='p-2 rounded-tl-3xl rounded-r-3xl bg-light'>
                    <p className='p-2'>{message}</p>
                    {imgSrc && <img
                        className="my-2 min-w-full max-w-full rounded-xl"
                        src={imgSrc}
                        alt=""
                        />
                    }
                </div>
                {dateCreated && <span className='w-max px-1 mt-2 text-xs dark:text-light'>{formatRelative(new Date(dateCreated.seconds*1000), new Date())}</span>}
            </div>
        </div>)
        }
        </>
    )
}
