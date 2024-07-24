import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Comments from './Comments';
import Modal from 'react-modal';
import { FaBars, FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');

const CommunityPage = () => {
  const [categories, setCategories] = useState([]);
  const [threads, setThreads] = useState([]);
  const [events, setEvents] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedThread, setExpandedThread] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadCategoryId, setNewThreadCategoryId] = useState('');
  const [user, setUser] = useState(null);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showCreateThreadModal, setShowCreateThreadModal] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const fetchCategories = async () => {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const fetchedCategories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const sortedCategories = fetchedCategories.sort((a, b) => {
      if (a.name === 'General') return -1;
      if (b.name === 'General') return 1;
      return 0;
    });
    setCategories(sortedCategories);
    setNewThreadCategoryId(sortedCategories[0]?.id || '');
  };

  const fetchThreads = async () => {
    const threadsSnapshot = await getDocs(collection(db, 'threads'));
    setThreads(threadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchEvents = async () => {
    const eventsSnapshot = await getDocs(collection(db, 'events'));
    setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchCategories();
    fetchThreads();
    fetchEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (user) {
        fetchCategories();
        fetchThreads();
        fetchEvents();
      }
    });
    return unsubscribe;
  }, []);

  const createEvent = async () => {
    if (!user) {
      alert('Please log in to create an event.');
      return;
    }
    await addDoc(collection(db, 'events'), {
      title: newEventTitle,
      date: new Date(newEventDate),
      createdBy: user.uid,
    });
    setNewEventTitle('');
    setNewEventDate('');
    fetchEvents();
    setShowCreateEventModal(false);
  };

  const createThread = async () => {
    if (!user) {
      alert('Please log in to create a thread.');
      return;
    }
    await addDoc(collection(db, 'threads'), {
      title: newThreadTitle,
      categoryId: newThreadCategoryId,
      createdAt: new Date(),
      createdBy: user.uid,
    });
    setNewThreadTitle('');
    setNewThreadCategoryId(categories[0]?.id || '');
    fetchThreads();
    setShowCreateThreadModal(false);
  };

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(categoryId);
    setActiveCategoryId(categoryId);
    setExpandedThread(null);
    setSidebarVisible(false); // Hide sidebar on mobile when a category is selected
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="container mx-auto p-4 flex">
      <button onClick={toggleSidebar} className="md:hidden p-2 bg-blue-500 text-white rounded mb-4">
        {sidebarVisible ? <FaTimes /> : <FaBars />}
      </button>
      <aside className={`sidebar p-4 rounded-lg shadow-md ${sidebarVisible ? 'visible' : 'hidden'} md:block`}>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item ${activeCategoryId === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {activeCategoryId === category.id && <div className="circle-indicator"></div>}
            {category.name}
          </div>
        ))}
        <h2 className="text-xl font-semibold mb-4 mt-4">Events</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              {event.title} - {new Date(event.date.seconds * 1000).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </aside>
      <main className={`main-content p-4 flex-grow bg-light-tint dark:bg-dark-tint text-dark-shade dark:text-light-shade ${sidebarVisible ? 'sidebar-visible' : ''}`}>
        {user && (
          <div className="button-container mb-4 flex justify-end md:justify-start">
            <button
              onClick={() => setShowCreateEventModal(true)}
              className="p-2 bg-blue-500 text-white rounded mr-2 md:mr-4"
            >
              Create Event
            </button>
            <button
              onClick={() => setShowCreateThreadModal(true)}
              className="p-2 bg-blue-500 text-white rounded mt-2 md:mt-0"
            >
              Create Thread
            </button>
          </div>
        )}
        {expandedCategory ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Threads in {categories.find(category => category.id === expandedCategory)?.name}
            </h2>
            <p className="mb-4 text-dark-shade">
              {categories.find(category => category.id === expandedCategory)?.description}
            </p>
            <ul>
              {threads
                .filter(thread => thread.categoryId === expandedCategory)
                .map(thread => (
                  <li key={thread.id} className="thread-item mb-4 p-4 rounded-lg shadow-md bg-light-shade dark:bg-dark-shade">
                    <h4
                      className="text-md font-semibold cursor-pointer"
                      onClick={() => setExpandedThread(expandedThread === thread.id ? null : thread.id)}
                    >
                      {thread.title}
                    </h4>
                    {expandedThread === thread.id && <Comments threadId={thread.id} />}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <h2 className="text-xl font-semibold mb-4">Select a category to view threads.</h2>
        )}
      </main>
      <Modal
        isOpen={showCreateEventModal}
        onRequestClose={() => setShowCreateEventModal(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <input
          type="text"
          value={newEventTitle}
          onChange={e => setNewEventTitle(e.target.value)}
          placeholder="New event title"
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="date"
          value={newEventDate}
          onChange={e => setNewEventDate(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <button onClick={createEvent} className="p-2 bg-blue-500 text-white rounded mr-2">
          Create Event
        </button>
        <button
          onClick={() => setShowCreateEventModal(false)}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </Modal>
      <Modal
        isOpen={showCreateThreadModal}
        onRequestClose={() => setShowCreateThreadModal(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Thread</h2>
        <input
          type="text"
          value={newThreadTitle}
          onChange={e => setNewThreadTitle(e.target.value)}
          placeholder="New thread title"
          className="border p-2 rounded mb-4 w-full"
        />
        <select
          value={newThreadCategoryId}
          onChange={e => setNewThreadCategoryId(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button onClick={createThread} className="p-2 bg-blue-500 text-white rounded mr-2">
          Create Thread
        </button>
        <button
          onClick={() => setShowCreateThreadModal(false)}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default CommunityPage;
