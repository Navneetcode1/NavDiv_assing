import React, { useEffect, useState } from 'react';
import Charts from './Charts';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/candidates');
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Candidates List</h1>
      {candidates.length > 0 ? (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate._id} style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
              <p><strong>Name:</strong> {candidate.name}</p>
              <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
              <p><strong>Experience:</strong> {candidate.experience} years</p>
              <p><strong>Location:</strong> {candidate.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates found.</p>
      )}
        <Charts data={candidates.map(({ name, experience }) => ({ name, experience }))} />
    </div>
  );
};

export default CandidatesList;
