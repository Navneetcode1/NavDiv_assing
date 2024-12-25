import React, { useState, useEffect } from 'react';
import { fetchCandidates, deleteCandidate, addCandidate, editCandidate } from '../apiservice'; // Add updateCandidate API service
import EditCandidatePopup from '../components/EditCandidatePopup';
import DeleteCandidate from '../components/DeleteCandidate';

const AdminPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false); // State to manage create form visibility
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    skills: '',
    experience: '',
    location: '',
    videoInterviewResult: '',
    codingResult: ''
  });

  useEffect(() => {
    const getCandidates = async () => {
      const data = await fetchCandidates();
      setCandidates(data);
    };
    getCandidates();
  }, []);

  const handleDelete = async (id) => {
    const deleted = await deleteCandidate(id);
    if (deleted) {
      alert('Candidate deleted successfully!');
      setCandidates(await fetchCandidates()); // Refresh the candidates list
    }
  };

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setShowEditPopup(true);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = newCandidate.skills.split(',').map(skill => skill.trim());
    const candidateToCreate = { ...newCandidate, skills: skillsArray };

    const createdCandidate = await addCandidate(candidateToCreate);
    if (createdCandidate) {
      alert('Candidate created successfully!');
      setCandidates(await fetchCandidates()); // Refresh the candidates list
      setShowCreateForm(false); // Close the create form
      setNewCandidate({ name: '', skills: '', experience: '', location: '', videoInterviewResult: '', codingResult: '' }); // Reset form
    }
  };

  const handleUpdateSubmit = async (e, updatedData) => {
    e.preventDefault();
    const skillsArray = updatedData.skills.split(',').map(skill => skill.trim());
    const candidateToUpdate = { ...updatedData, skills: skillsArray };

    const updatedCandidate = await editCandidate(candidateToUpdate, selectedCandidate._id);
    if (updatedCandidate) {
      alert('Candidate updated successfully!');
      setCandidates(await fetchCandidates()); // Refresh the candidates list
      setShowEditPopup(false); // Close the edit popup
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-semibold text-blue-600 mb-6">Admin Dashboard</h1>

      {/* Button to trigger create form */}
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {showCreateForm ? 'Cancel' : 'Add New Candidate'}
      </button>

      {/* Create Candidate Form */}
      {showCreateForm && (
        <form onSubmit={handleCreateSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4 mb-8">
          <input
            type="text"
            name="name"
            value={newCandidate.name}
            onChange={handleCreateChange}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="skills"
            value={newCandidate.skills}
            onChange={handleCreateChange}
            placeholder="Skills (comma separated)"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="experience"
            value={newCandidate.experience}
            onChange={handleCreateChange}
            placeholder="Experience"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            value={newCandidate.location}
            onChange={handleCreateChange}
            placeholder="Location"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="videoInterviewResult"
            value={newCandidate.videoInterviewResult}
            onChange={handleCreateChange}
            placeholder="Video Interview Result"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="codingResult"
            value={newCandidate.codingResult}
            onChange={handleCreateChange}
            placeholder="Coding Result"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Create Candidate
          </button>
        </form>
      )}

      {/* List of Candidates */}
      <div className="w-full max-w-4xl" >
        <ul  className="space-y-4">
          {candidates.map((candidate) => (
            <li key={candidate._id} className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
              <div >
                <p className="text-lg font-semibold text-gray-800">Name: {candidate.name}</p>
                <p className="text-gray-600">Skills: {candidate.skills.join(', ')}</p>
                <p className="text-gray-600">Experience: {candidate.experience}</p>
                <p className="text-gray-600">Location: {candidate.location}</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(candidate)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(candidate._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Candidate Popup */}
      {showEditPopup && (
        <EditCandidatePopup
          candidate={selectedCandidate}
          closePopup={() => setShowEditPopup(false)}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default AdminPage;
