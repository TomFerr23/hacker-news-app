import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const CommunityPage = () => {
  const [categories, setCategories] = useState([]);
  const [threads, setThreads] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadCategoryId, setNewThreadCategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const fetchedCategories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(fetchedCategories);
      setNewThreadCategoryId(fetchedCategories[0]?.id || '');
    };

    const fetchThreads = async () => {
      const threadsSnapshot = await getDocs(collection(db, 'threads'));
      setThreads(threadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchEvents = async () => {
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchCategories();
    fetchThreads();
    fetchEvents();
  }, []);

  const createEvent = async () => {
    await addDoc(collection(db, 'events'), {
      title: newEventTitle,
      date: new Date(newEventDate)
    });
    setNewEventTitle('');
    setNewEventDate('');
    fetchEvents(); // Fetch events again to update the list
  };

  const createThread = async () => {
    await addDoc(collection(db, 'threads'), {
      title: newThreadTitle,
      categoryId: newThreadCategoryId,
      createdAt: new Date()
    });
    setNewThreadTitle('');
    setNewThreadCategoryId(categories[0]?.id || '');
    fetchThreads(); // Fetch threads again to update the list
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community Page</h1>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-4 mt-4">Threads</h2>
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>{thread.title}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-4 mt-4">Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title} - {new Date(event.date.seconds * 1000).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newEventTitle}
        onChange={e => setNewEventTitle(e.target.value)}
        placeholder="New event title"
        className="border p-2 rounded mr-4"
      />
      <input
        type="date"
        value={newEventDate}
        onChange={e => setNewEventDate(e.target.value)}
        className="border p-2 rounded mr-4"
      />
      <button onClick={createEvent} className="p-2 bg-blue-500 text-white rounded">Create Event</button>
      <div className="mt-8">
        <input
          type="text"
          value={newThreadTitle}
          onChange={e => setNewThreadTitle(e.target.value)}
          placeholder="New thread title"
          className="border p-2 rounded mr-4"
        />
        <select
          value={newThreadCategoryId}
          onChange={e => setNewThreadCategoryId(e.target.value)}
          className="border p-2 rounded mr-4"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button onClick={createThread} className="p-2 bg-blue-500 text-white rounded">Create Thread</button>
      </div>
    </div>
  );
};

export default CommunityPage;
