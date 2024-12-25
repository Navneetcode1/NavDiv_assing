const Candidate = require('../models/Candidate');

exports.searchCandidates = async (req, res) => {
  try {
    const { skills, experience, location } = req.query;
    const query = {};
    if (skills) query.skills = { $in: skills.split(',') };
    if (experience) query.experience = { $gte: Number(experience) };
    if (location) query.location = location;

    const candidates = await Candidate.find(query);
    res.status(200).json(candidates);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
