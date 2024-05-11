import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts');
        console.log("Fetched data:", response.data);  // Logging to ensure the structure
        setPosts(response.data.data);  // Adjusted to access the nested data array
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);  // Explicitly set to empty array on error
      }
    };
  
    fetchPosts();
  }, []);

  return (
    <div className="main">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>Author: {post.author_username}</small>
          </div>
        ))
      ) : (
        <p>No posts available or still loading...</p>
      )}
    </div>
  );
  
}

export default Posts;