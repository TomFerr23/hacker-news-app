import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import db
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  const createEvent = async () => {
    const eventsCollection = collection(db, 'events');
    await addDoc(eventsCollection, {
      title: newEventTitle,
      date: Timestamp.fromDate(new Date(newEventDate))
    });
    setNewEventTitle('');
    setNewEventDate('');
    fetchEvents();
  };

  return (
    <div>
      <h2>Events</h2>
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
      />
      <input
        type="date"
        value={newEventDate}
        onChange={e => setNewEventDate(e.target.value)}
      />
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
};

export default Events;
