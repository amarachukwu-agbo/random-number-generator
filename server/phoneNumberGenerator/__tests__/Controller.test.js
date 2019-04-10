import request from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import app from '../..';

process.env.FILE_STORAGE_PATH = '../db/numbers.test.json';
describe('Phone Number Routes', () => {
  describe('POST api/v1/numbers', () => {
    const testFilePathName = path.resolve(__dirname, '../../db/numbers.test.json');
    beforeEach(async (done) => {
      await fs.writeFile(testFilePathName, JSON.stringify([]));
      done();
    });

    it('generates new numbers and returns the right response', async (done) => {
      const response = await request(app)
        .post('/api/v1/numbers');
      expect(response.status).toEqual(201);
      expect(response.body.message)
        .toEqual('New phone numbers successfully generated');
      expect(response.body)
        .toHaveProperty('generatedNumbers');
      expect(response.body.generatedNumbers.length)
        .toEqual(1000);
      done();
    });

    it('saves the numbers to the numbers', async (done) => {
      const response = await request(app)
        .post('/api/v1/numbers');
      const savedNumbers = await fs.readFile(testFilePathName, 'utf-8');
      const generatedNumbers = JSON.stringify(response.body.generatedNumbers);
      expect(savedNumbers).toEqual(generatedNumbers);
      done();
    });

    it('returns unique numbers', async (done) => {
      await request(app)
        .post('/api/v1/numbers');
      const savedNumbers = await fs.readFile(testFilePathName, 'utf-8');
      const savedNumbersToJSON = JSON.parse(savedNumbers);
      const uniqueNumbersLength = new Set(savedNumbersToJSON).size;
      expect(savedNumbersToJSON.length).toEqual(uniqueNumbersLength);
      done();
    });

    it('generates exactly 10 digit numbers', async (done) => {
      const response = await request(app)
        .post('/api/v1/numbers');
      const { body: { generatedNumbers } } = response;
      const isTenDigits = generatedNumbers.every(num => num.length === 10);
      expect(isTenDigits).toBe(true);
      done();
    });
  });
});
