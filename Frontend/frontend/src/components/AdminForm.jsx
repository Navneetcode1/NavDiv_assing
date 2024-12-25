import React, { useState } from 'react';
import { addCandidate } from '../apiservice';

const AdminForm = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [videoInterviewResult, setVideoInterviewResult] = useState('');
  const [codingResult, setCodingResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const candidate = {
      name,
      skills: skills.split(','),
      experience,
      location,
      videoInterviewResult,
      codingResult,
    };

    const result = await addCandidate(candidate);
    if (result) {
      alert('Candidate added successfully!');
      setName('');
      setSkills('');
      setExperience('');
      setLocation('');
      setVideoInterviewResult('');
      setCodingResult('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Candidate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <input
        type="number"
        placeholder="Years of Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Video Interview Result"
        value={videoInterviewResult}
        onChange={(e) => setVideoInterviewResult(e.target.value)}
      />
      <input
        type="text"
        placeholder="Coding Test Result"
        value={codingResult}
        onChange={(e) => setCodingResult(e.target.value)}
      />
      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default AdminForm;
