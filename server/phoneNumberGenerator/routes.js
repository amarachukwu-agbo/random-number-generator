import express from 'express';
import Controller from './Controller';

const router = express.Router();

router.post('/numbers', Controller.generatePhoneNumbers);

export default router;
