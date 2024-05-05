import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios.get('http://localhost:8000/posts')
        .then(response => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    }
  }, [loading]); // Depend on loading to prevent refetching unless explicitly set

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>Author: {post.author_username}</small>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )
      )}
    </div>
  );
}

export default Posts;
