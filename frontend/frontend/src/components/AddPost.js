import React, { useState } from 'react';
import axios from 'axios';

function AddPost({ token }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      title: title,
      content: content
    };

    try {
      const response = await axios.post('http://localhost:8000/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Post added successfully');
      setTitle('');  // Reset title state
      setContent('');  // Reset content state
    } catch (error) {
      alert('Failed to add post: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default AddPost;
