import React from 'react';
import { deleteCandidate } from '../apiservice';

const DeleteCandidate = ({ candidateId, closePopup, updateCandidates }) => {
  const handleDelete = async () => {
    const deleted = await deleteCandidate(candidateId);
    if (deleted) {
      alert('Candidate deleted successfully!');
      updateCandidates(); 
      closePopup(); 
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Are you sure you want to delete this candidate?</h2>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closePopup}>No, Cancel</button>
      </div>
    </div>
  );
};

export default DeleteCandidate;
