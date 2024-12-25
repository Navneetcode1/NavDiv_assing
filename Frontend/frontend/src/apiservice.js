import axios from 'axios';

// Base URL of the backend
const API_URL = 'http://localhost:5000/api/candidates';

// Function to add a new candidate
export const addCandidate = async (candidate) => {
  try {
    const response = await axios.post(API_URL, candidate);
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
  }
};

// Function to fetch all candidates
export const fetchCandidates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};

// Function to edit a candidate by ID
export const editCandidate = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data; // Return the updated candidate
  } catch (error) {
    console.error('Error updating candidate:', error);
  }
};

// Function to delete a candidate by ID
export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}s/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting candidate:', error);
  }
};
