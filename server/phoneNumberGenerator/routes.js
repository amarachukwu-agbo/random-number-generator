import express from 'express';
import Controller from './Controller';

const router = express.Router();

router.post('/numbers', Controller.generatePhoneNumbers);
router.get('/numbers', Controller.getPhoneNumbers);
router.get('/number', Controller.getMinOrMaxNumber);
router.delete('/numbers', Controller.deletePhoneNumbers);

export default router;
