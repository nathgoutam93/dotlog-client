import React from 'react';
import Timeline from '../components/timeline';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { timeline } = useFirestore();

  return (
    <div className="w-full h-full">
      {currentUser && <Timeline feeds={timeline} />}
    </div>
  );
}
