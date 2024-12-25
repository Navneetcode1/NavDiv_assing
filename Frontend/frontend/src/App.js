import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import RecruiterPage from './pages/RecruiterPage';
import Charts from './components/Charts'; 
import ChatInterface from './components/ChatInterface'; 

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://navdiv-assing-b.onrender.com/api/candidates');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-semibold">Candidate Management App</div>
            <div className="space-x-6">
              <Link
                to="/admin"
                className="hover:bg-blue-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/recruiter"
                className="hover:bg-green-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Recruiter Dashboard
              </Link>
              <Link
                to="/charts"
                className="hover:bg-purple-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                View Charts
              </Link>
              <Link
                to="/chat"
                className="hover:bg-orange-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Chat Interface
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/recruiter" element={<RecruiterPage />} />
            <Route path="/charts" element={<Charts data={candidates} />} />
            <Route path="/chat" element={<ChatInterface />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
