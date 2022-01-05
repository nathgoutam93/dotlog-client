import { useEffect, useState } from 'react'
import { onSnapshot, collection, orderBy, limit, query } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function useGetMessages(conversationId) {

    const [Messages, setMessages] = useState([])

    useEffect(()=>{

        const q = query(
            collection(db,'conversations',`${conversationId}`,'Messages'),
            orderBy('dateCreated'),
            limit(25)
        )
            
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
        
            querySnapshot.forEach((doc)=>{
                messages.push(doc.data())
            })

            setMessages(messages)
        })

        return ()=> unsubscribe()
    },[conversationId, setMessages])

    return Messages
}
