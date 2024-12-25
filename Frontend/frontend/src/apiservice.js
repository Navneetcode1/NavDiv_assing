import axios from 'axios';


const API_URL = 'https://navdiv-assing-b.onrender.com/api/candidates';


export const addCandidate = async (candidate) => {
  try {
    const response = await axios.post(API_URL, candidate);
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
  }
};

export const fetchCandidates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};


export const editCandidate = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data; 
  } catch (error) {
    console.error('Error updating candidate:', error);
  }
};


export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}s/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting candidate:', error);
  }
};
