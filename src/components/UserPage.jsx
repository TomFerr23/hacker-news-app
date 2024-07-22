import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Correctly import db from firebase.js
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const UserPage = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          fetchBookmarks(user.uid);
        } else {
          setUser(null);
          setBookmarkedArticles([]);
        }
      });
    };

    fetchUser();
  }, []);

  const fetchBookmarks = async (uid) => {
    const q = query(collection(db, 'savedArticles'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const bookmarks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookmarkedArticles(bookmarks);
  };

  const removeBookmark = async (articleId) => {
    if (user) {
      const docId = (await getDocs(query(collection(db, 'savedArticles'), where('id', '==', articleId), where('uid', '==', user.uid)))).docs[0].id;
      await deleteDoc(doc(db, 'savedArticles', docId));
      setBookmarkedArticles(prev => prev.filter(article => article.id !== articleId));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookmarkedArticles.map(article => (
          <div key={article.id} className="card-bg rounded-lg shadow-md overflow-hidden m-4 transition-colors duration-300 flex flex-col justify-between h-full">
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold mb-2 truncate-3-lines">
                  {article.title}
                </a>
              </div>
              <div className="text-sm text-light dark:text-dark flex items-center mt-4 justify-between">
                <div className="flex items-center">
                  <button onClick={() => removeBookmark(article.id)}>
                    Remove Bookmark
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
