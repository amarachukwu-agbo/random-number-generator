import request from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import app from '../..';

process.env.FILE_STORAGE_PATH = './db/numbers.test.json';
describe('Phone Number Routes', () => {
  const testFilePathName = path.resolve(__dirname, '../../db/numbers.test.json');
  describe('POST api/v1/numbers', () => {
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

  describe('GET api/v1/numbers', () => {
    const testPhoneNumbers = [
      '0577639061',
      '0604455769',
      '0281275266',
      '0655514451',
      '0192719520',
      '0770292589',
      '0742391520',
      '0996698416',
      '0621061108',
      '0677269098',
    ];
    const assertMetaValues = response => expect(response.body.meta)
      .toMatchObject({
        currentPage: 1,
        limit: 10,
        pagesCount: 1,
        totalCount: 10,
      });
    beforeAll(async (done) => {
      await fs.writeFile(testFilePathName, JSON.stringify(testPhoneNumbers));
      done();
    });

    it('gets all phone numbers and returns the right response', async (done) => {
      const response = await request(app)
        .get('/api/v1/numbers');
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      expect(response.body.phoneNumbers)
        .toEqual(testPhoneNumbers);
      assertMetaValues(response);
      done();
    });

    it('sorts phone numbers in ascending order', async (done) => {
      const response = await request(app)
        .get('/api/v1/numbers?sort=ASC');
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      expect(response.body.phoneNumbers)
        .toEqual([
          '0192719520',
          '0281275266',
          '0577639061',
          '0604455769',
          '0621061108',
          '0655514451',
          '0677269098',
          '0742391520',
          '0770292589',
          '0996698416',
        ]);
      assertMetaValues(response);
      done();
    });

    it('sorts phone numbers in descending order', async (done) => {
      const response = await request(app)
        .get('/api/v1/numbers?sort=DESC');
      expect(response.status).toEqual(200);
      expect(response.body.message)
        .toEqual('Phone numbers successfully retrieved');
      expect(response.body.phoneNumbers)
        .toEqual([
          '0996698416',
          '0770292589',
          '0742391520',
          '0677269098',
          '0655514451',
          '0621061108',
          '0604455769',
          '0577639061',
          '0281275266',
          '0192719520',
        ]);
      assertMetaValues(response);
      done();
    });

    it('retrieves numbers using page and limit query values',
      async (done) => {
        const response = await request(app)
          .get('/api/v1/numbers?page=2&limit=2');
        expect(response.status).toEqual(200);
        expect(response.body.message)
          .toEqual('Phone numbers successfully retrieved');
        expect(response.body.phoneNumbers)
          .toEqual([
            '0281275266',
            '0655514451',
          ]);
        expect(response.body.meta)
          .toMatchObject({
            currentPage: 2,
            limit: 2,
            pagesCount: 5,
          });
        done();
      });
  });
});
