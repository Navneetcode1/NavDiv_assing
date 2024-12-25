import React, { useEffect, useState } from 'react';
import { fetchCandidates } from '../apiservice';

const RecruiterPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getCandidates = async () => {
      const data = await fetchCandidates();
      setCandidates(data);
    };

    getCandidates();
  }, []);

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase()) ||
    candidate.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Candidates by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Candidates List */}
        <div>
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div
                key={candidate._id}
                className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800">{candidate.name}</h3>
                <p className="text-gray-600">Skills: {candidate.skills.join(', ')}</p>
                <p className="text-gray-600">Experience: {candidate.experience} years</p>
                <p className="text-gray-600">Location: {candidate.location}</p>
                <p className="text-gray-600">Video Interview Result: {candidate.videoInterviewResult}</p>
                <p className="text-gray-600">Coding Result: {candidate.codingResult}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No candidates found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
