const express = require('express');
const { searchCandidates } = require('../controllers/recruiterController');
const router = express.Router();

router.get('/search', searchCandidates);

module.exports = router;
