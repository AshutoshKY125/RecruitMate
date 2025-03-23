import express from 'express';
import { createCandidate, getAllCandidates, getCandidateById, updateCandidate, deleteCandidate } from '../controllers/CandidateController.js';

const router = express.Router();

router.post('/create', createCandidate);
router.get('/all', getAllCandidates);
router.get('/:id', getCandidateById);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;
