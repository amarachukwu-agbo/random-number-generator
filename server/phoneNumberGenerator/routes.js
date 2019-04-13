import express from 'express';
import Controller from './Controller';

const router = express.Router();

router.post('/numbers', Controller.generatePhoneNumbers);
router.get('/numbers/:batchID', Controller.getPhoneNumbers);
router.get('/batches', Controller.getBatchIDs);

export default router;
