// models/Candidate.js

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  experience: Number,
  location: String,
  videoInterviewResult: String,
  codingResult: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
