import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
  const { id } = useParams();
//   console.log(id,"id ")
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`https://easy-capital-backend.vercel.app/blogs/${id}`);
//         setTitle(response.data.title);
//         setDescription(response.data.description);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBlog();
//   }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(id, "id on 28")
      const response = await axios.put(`https://easy-capital-backend.vercel.app/blogs/${id}`, { title, description }, {withCredentials:true});
      console.log(response,"this is a response from backend")
      navigate('/your-blogs');
    } catch (error) {
      console.error(error, "this is a error in updating blog");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Update</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
