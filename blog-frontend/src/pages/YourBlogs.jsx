import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (auth && auth.userId) {
        console.log("Fetching blogs for user:", auth.userId);
        try {
          const response = await axios.get(`https://easy-capital-backend.vercel.app/blogs?userId=${auth.userId}`, { withCredentials: true });
          console.log("Blogs fetched:", response.data);
          setBlogs(response.data.filter(blog => blog.author._id === auth.userId));
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      }
    };
    fetchBlogs();
  }, [auth]);

  const handleDelete = async (id) => {
    console.log("Deleting blog with ID:", id);
    try {
      await axios.delete(`https://easy-capital-backend.vercel.app/blogs/${id}`, { withCredentials: true });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleUpdate = (id) => {
    console.log("Updating blog with ID:", id);
    navigate(`/update/${id}`);
  };

//   if (!auth || !auth.userId) {
//     return <p>Please log in to view your blogs.</p>;
//   }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog._id} className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.description}</p>
            <p className="text-gray-500">By {blog.authorName}</p>
            <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white p-2 mr-2">Delete</button>
            <button onClick={() => handleUpdate(blog._id)} className="bg-blue-500 text-white p-2">Update</button>
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default YourBlogs;