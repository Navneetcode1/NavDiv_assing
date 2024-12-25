import React, { useState, useEffect } from 'react';
import { editCandidate } from '../apiservice';

const EditCandidatePopup = ({ candidate, closePopup, updateCandidates }) => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    experience: '',
    location: '',
    videoInterviewResult: '',
    codingResult: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name,
        skills: candidate.skills.join(', '),
        experience: candidate.experience,
        location: candidate.location,
        videoInterviewResult: candidate.videoInterviewResult || '',
        codingResult: candidate.codingResult || '',
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCandidate = {
      ...formData,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
      experience: Number(formData.experience),
    };

    const response = await editCandidate(candidate._id, updatedCandidate);
    if (response) {
      alert('Candidate updated successfully!');
      updateCandidates(); // Call the parent function to update candidates
      closePopup();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Candidate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="videoInterviewResult"
            value={formData.videoInterviewResult}
            onChange={handleChange}
            placeholder="Video Interview Result"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="codingResult"
            value={formData.codingResult}
            onChange={handleChange}
            placeholder="Coding Result"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closePopup}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidatePopup;
