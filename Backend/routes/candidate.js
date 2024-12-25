const express = require('express');
const router = express.Router();
const { addCandidate, updateCandidate } = require('../controllers/candidateController');  

router.post('/candidates', addCandidate);

router.put('/candidates/:id', updateCandidate); 


module.exports = router;
