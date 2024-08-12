import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://easy-capital-backend.vercel.app/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      {blogs.map(blog => (
        <div key={blog._id} className="border p-4 mb-4">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p>{blog.description}</p>
          <p className="text-gray-500">By {blog.authorName}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;