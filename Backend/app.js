// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Candidate = require('./models/Candidate'); 

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());
console.log('hit')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected to MongoDB Atlas'))
  .catch((err) => console.log('Database connection error:', err));

app.post('/api/candidates', async (req, res) => {
  const { name, skills, experience, location, videoInterviewResult, codingResult } = req.body;
  try {
    const newCandidate = new Candidate({
      name,
      skills,
      experience,
      location,
      videoInterviewResult,
      codingResult,
    });

    await newCandidate.save();
    res.status(201).json(newCandidate); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to add candidate' });
  }
});

// GET route to fetch all candidates
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find(); 
    res.status(200).json(candidates); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

app.put('/api/candidates/:id', async (req, res) => {
  const { id } = req.params;
  const { name, skills, experience, location, videoInterviewResult, codingResult } = req.body;
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { name, skills, experience, location, videoInterviewResult, codingResult },
      { new: true }
    );
    if (!updatedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update candidate' });
  }
});

app.delete('/api/candidatess/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(id);
    if (!deletedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
