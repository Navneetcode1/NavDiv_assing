const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/adminController');

router.post('/candidates', candidateController.addCandidate);

router.put('/candidates/:id', candidateController.updateCandidate);
// router.put('/candidates/:id', candidateController.updateCandidate);


module.exports = router;
