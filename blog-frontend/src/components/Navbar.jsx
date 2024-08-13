import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');  // Redirect to home or login page after logging out
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md relative">
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <img src='https://easycapital.co.in/images/easy-capital-logo.png' className="w-12 h-12" alt="Logo" />
        <div className="ml-2 text-gray-800 text-xl">
          <span className="font-bold">Easy</span> <span>Capital</span>
        </div>
      </div>

      <div className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes className="text-gray-800 text-2xl" /> : <FaBars className="text-gray-800 text-2xl" />}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-0 bg-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
        style={{ top: '64px', right: 0, width: '100%' }}
      >
        <div className="flex flex-col items-center mt-8 space-y-4">
          {!auth ? (
            <>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Signup</Link>
              <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Create Blog</Link>
              <Link to="/your-blogs" className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Your Blogs</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex space-x-4">
        {!auth ? (
          <>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Signup
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="bg-green-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </>
        ) : (
          <>
            <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded">Create Blog</Link>
            <Link to="/your-blogs" className="bg-green-500 text-white px-4 py-2 rounded">Your Blogs</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;