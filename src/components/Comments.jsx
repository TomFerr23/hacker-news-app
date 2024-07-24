import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Comments = ({ threadId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'comments'), where('threadId', '==', threadId), orderBy('createdAt')),
      (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      }
    );

    return () => unsubscribe();
  }, [threadId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const addComment = async () => {
    if (!user) {
      alert('Please log in to add a comment.');
      return;
    }
    await addDoc(collection(db, 'comments'), {
      threadId,
      text: newComment,
      createdAt: new Date(),
      createdBy: user.uid
    });
    setNewComment('');
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <ul className="mb-4">
        {comments.map(comment => (
          <li key={comment.id} className="border-b py-2">
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      {user && (
        <div className="flex">
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="border p-2 rounded flex-1"
          />
          <button onClick={addComment} className="p-2 bg-blue-500 text-white rounded ml-2">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Comments;
