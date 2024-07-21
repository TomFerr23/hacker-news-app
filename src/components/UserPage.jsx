// src/components/UserPage.jsx
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          fetchSavedArticles(user.uid);
        } else {
          setUser(null);
        }
      });
    };

    fetchUser();
  }, []);

  const fetchSavedArticles = async (uid) => {
    const q = query(collection(firestore, 'savedArticles'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSavedArticles(articles);
  };

  const removeArticle = async (id) => {
    await deleteDoc(doc(firestore, 'savedArticles', id));
    setSavedArticles(savedArticles.filter(article => article.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="flex items-center mb-4">
          <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
          <h2 className="text-2xl">{user.displayName}</h2>
        </div>
      )}
      <h3 className="text-xl mb-4">Saved Articles</h3>
      {savedArticles.length > 0 ? (
        <ul>
          {savedArticles.map(article => (
            <li key={article.id} className="mb-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {article.title}
              </a>
              <p className="text-gray-500 text-sm">{new Date(article.date).toLocaleString()}</p>
              <button onClick={() => removeArticle(article.id)} className="text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved articles yet.</p>
      )}
      <button onClick={() => auth.signOut()} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Log Out
      </button>
    </div>
  );
};

export default UserPage;
