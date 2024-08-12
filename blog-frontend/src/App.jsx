import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import YourBlogs from './pages/YourBlogs';
import UpdateBlog from './pages/UpdateBlog';
import Signup from './pages/Signup';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/your-blogs" element={<YourBlogs />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;