import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import { firestore } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const NewsList = ({ searchTerm }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [user, setUser] = useState(null);

  const HN_API_BASE_URL = import.meta.env.VITE_HN_API_BASE_URL;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data: ids } = await axios.get(`${HN_API_BASE_URL}/newstories.json`);
        const newsPromises = ids.slice(0, 12 * page).map(id =>
          axios.get(`${HN_API_BASE_URL}/item/${id}.json`)
        );
        const newsData = await Promise.all(newsPromises);
        setNews(newsData.map(({ data }) => data));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, searchTerm]);

  useEffect(() => {
    const fetchUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          fetchBookmarks(user.uid);
        } else {
          setUser(null);
          setBookmarks(new Set());
        }
      });
    };

    fetchUser();
  }, []);

  const fetchBookmarks = async (uid) => {
    const q = query(collection(firestore, 'savedArticles'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const bookmarksSet = new Set(querySnapshot.docs.map(doc => doc.data().id));
    setBookmarks(bookmarksSet);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleBookmark = async (article) => {
    if (user) {
      const updatedBookmarks = new Set(bookmarks);
      if (updatedBookmarks.has(article.id)) {
        await deleteDoc(doc(firestore, 'savedArticles', article.id));
        updatedBookmarks.delete(article.id);
      } else {
        await addDoc(collection(firestore, 'savedArticles'), {
          ...article,
          uid: user.uid,
          date: new Date()
        });
        updatedBookmarks.add(article.id);
      }
      setBookmarks(updatedBookmarks);
    } else {
      alert('Please log in to save articles.');
    }
  };

  const filteredNews = news.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNews.map(item => (
          <NewsItem
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            date={item.time * 1000}
            isBookmarked={bookmarks.has(item.id)}
            toggleBookmark={() => toggleBookmark(item)}
          />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex justify-center mt-12">
          <button onClick={loadMore} className="p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
