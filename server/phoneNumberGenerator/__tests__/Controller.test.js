import request from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import app from '../..';
import Controller from '../Controller';


describe('Phone Number Routes', () => {
  describe('GET api/v1/batches', () => {
    it('returns all batches', async (done) => {
      const response = await request(app)
        .get('/api/v1/batches');
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Batch IDs retrieved successfully');
      done();
    });
  });
  describe('POST api/v1/numbers', () => {
    let response;
    let newFile;

    afterEach(async () => {
      const testFilePathName = path.resolve(__dirname, `../../db/numbers-${newFile}.txt`);
      await fs.unlink(testFilePathName);
    });

    beforeEach(async () => {
      response = await request(app)
        .post('/api/v1/numbers');
      newFile = response.body.batchID;
    });

    it('generates new numbers and returns the right response', async (done) => {
      expect(response.status).toEqual(201);
      expect(response.body.message)
        .toEqual('New phone numbers successfully generated');
      expect(response.body)
        .toHaveProperty('generatedNumbers');
      expect(response.body.generatedNumbers.length)
        .toEqual(150);
      done();
    });

    it('saves the numbers to the numbers', async (done) => {
      const testFilePathName = path.resolve(__dirname, `../../db/numbers-${newFile}.txt`);
      const savedNumbers = await fs.readFile(testFilePathName, 'utf-8');
      const generatedNumbers = response.body.generatedNumbers.join(',');
      expect(savedNumbers).toContain(generatedNumbers);
      done();
    });

    it('returns unique numbers', async (done) => {
      const testFilePathName = path.resolve(__dirname, `../../db/numbers-${newFile}.txt`);
      const savedNumbers = await fs.readFile(testFilePathName, 'utf-8');
      const savedNumbersToArray = savedNumbers.split(',');
      const uniqueNumbersLength = new Set(savedNumbersToArray).size;
      expect(savedNumbersToArray.length).toEqual(uniqueNumbersLength);
      done();
    });

    it('generates exactly 10 digit numbers', async (done) => {
      const { body: { generatedNumbers } } = response;
      const isTenDigits = generatedNumbers.every(num => num.length === 10);
      expect(isTenDigits).toBe(true);
      done();
    });
  });

  describe('GET api/v1/numbers/:batchID', () => {
    let apiResponse;
    let batch;
    let highestNumber;
    let lowestNumber;

    const assertMetaValues = response => expect(response.body.meta)
      .toMatchObject({
        currentPage: 1,
        limit: 150,
        pagesCount: 7,
        totalCount: 1000,
      });

    beforeAll(async (done) => {
      apiResponse = await request(app)
        .post('/api/v1/numbers');
      batch = apiResponse.body.batchID;
      highestNumber = apiResponse.body.minMaxPhoneNumbers.maxNumber;
      lowestNumber = apiResponse.body.minMaxPhoneNumbers.minNumber;
      done();
    });

    it('gets all phone numbers and returns the right response', async (done) => {
      const response = await request(app)
        .get(`/api/v1/numbers/${batch}`);
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      expect(response.body.batchID).toEqual(String(batch));
      assertMetaValues(response);
      done();
    });

    it('returns numbers in the first batch if batch is undefined', async (done) => {
      const response = await request(app)
        .get('/api/v1/numbers/undefined');
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      assertMetaValues(response);
      done();
    });

    it('sorts phone numbers in ascending order', async (done) => {
      const response = await request(app)
        .get(`/api/v1/numbers/${batch}?sort=ASC`);
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      expect(response.body.phoneNumbers[0])
        .toEqual(lowestNumber);
      assertMetaValues(response);
      done();
    });

    it('sorts phone numbers in descending order', async (done) => {
      const response = await request(app)
        .get(`/api/v1/numbers/${batch}?sort=DESC`);
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      expect(response.body.phoneNumbers[0])
        .toEqual(highestNumber);
      assertMetaValues(response);
      done();
    });

    it('retrieves numbers using page and limit query values',
      async (done) => {
        const response = await request(app)
          .get(`/api/v1/numbers/${batch}?page=2&limit=300`);
        expect(response.status).toEqual(200);
        expect(response.body.message)
          .toEqual('Phone numbers successfully retrieved');
        expect(response.body.meta)
          .toMatchObject({
            currentPage: 2,
            limit: 300,
            pagesCount: 4,
            totalCount: 1000,
          });
        done();
      });
    it('throws 404 error if no numbers have been generated',
      async (done) => {
        Controller.getBatches = jest.fn().mockReturnValue([]);
        const testFilePathName = path.resolve(__dirname, `../../db/numbers-${batch}.txt`);
        await fs.unlink(testFilePathName);
        const response = await request(app)
          .get(`/api/v1/numbers/${batch}?page=2`);
        expect(response.status).toEqual(404);
        expect(response.body.error)
          .toEqual('No numbers have been generated');
        jest.resetAllMocks();
        done();
      });
  });
});
