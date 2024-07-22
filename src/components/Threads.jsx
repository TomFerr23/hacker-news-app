import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import db
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';

const Threads = ({ selectedCategory, setSelectedThread }) => {
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      if (!selectedCategory) return;

      const threadsCollection = collection(db, 'threads');
      const q = query(threadsCollection, where('categoryId', '==', selectedCategory));
      const threadSnapshot = await getDocs(q);
      const threadList = threadSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setThreads(threadList);
    };

    fetchThreads();
  }, [selectedCategory]);

  const createThread = async () => {
    const threadsCollection = collection(db, 'threads');
    await addDoc(threadsCollection, {
      title: newThreadTitle,
      categoryId: selectedCategory,
      createdAt: Timestamp.fromDate(new Date())
    });
    setNewThreadTitle('');
    fetchThreads();
  };

  return (
    <div>
      <h2>Threads</h2>
      <ul>
        {threads.map(thread => (
          <li key={thread.id} onClick={() => setSelectedThread(thread.id)}>
            {thread.title}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newThreadTitle}
        onChange={e => setNewThreadTitle(e.target.value)}
        placeholder="New thread title"
      />
      <button onClick={createThread}>Create Thread</button>
    </div>
  );
};

export default Threads;
