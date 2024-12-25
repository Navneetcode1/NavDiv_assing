const Candidate = require('../models/Candidate');  // Import the Candidate model

// Add a candidate
exports.addCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      console.log('Request Params:', req.params);
  
      const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCandidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
  
      res.status(200).json(updatedCandidate);
    } catch (err) {
      console.error(err.message); // Log the error
      res.status(400).json({ error: err.message });
    }
  };
  

