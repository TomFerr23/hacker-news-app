import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import db
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';

const Comments = ({ selectedThread }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      if (!selectedThread) return;

      const commentsCollection = collection(db, 'comments');
      const q = query(commentsCollection, where('threadId', '==', selectedThread));
      const commentsSnapshot = await getDocs(q);
      const commentList = commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentList);
    };

    fetchComments();
  }, [selectedThread]);

  const createComment = async () => {
    const commentsCollection = collection(db, 'comments');
    await addDoc(commentsCollection, {
      text: newCommentText,
      threadId: selectedThread,
      createdAt: Timestamp.fromDate(new Date())
    });
    setNewCommentText('');
    fetchComments();
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newCommentText}
        onChange={e => setNewCommentText(e.target.value)}
        placeholder="New comment"
      />
      <button onClick={createComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
