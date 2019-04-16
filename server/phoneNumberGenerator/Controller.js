import { promises as fs } from 'fs';
import path from 'path';
import Utils from '../Utils';

class Controller {
  static async generatePhoneNumbers(req, res) {
    try {
      const numbers = new Set();
      const generatedNumbers = Controller.generateTenDigitNumbers(1000, numbers);
      const timeStamp = Date.now();
      const filePath = Utils.getFileStoragePath(timeStamp);

      // Save unique phone numbers to file storage
      await fs.writeFile(filePath, generatedNumbers);

      const { paginatedRecord, meta } = Utils
        .paginateRecords(generatedNumbers);

      return res.status(201)
        .json({
          message: 'New phone numbers successfully generated',
          generatedNumbers: paginatedRecord,
          batchID: timeStamp,
          minMaxPhoneNumbers: {
            maxNumber: generatedNumbers[generatedNumbers.length - 1],
            minNumber: generatedNumbers[0],
          },
          meta,
        });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({ error: error.toString() });
    }
  }

  // Generate random 10 digit numbers
  static generateTenDigitNumbers(i, randomNumbers, n = 0) {
    if (n === 1000) return Utils.sortRecord([...randomNumbers]);
    const newNumber = Math.floor((Math.random() * 900000000) + 100000000);
    const zeroPrefixNumber = `0${newNumber}`;
    randomNumbers.add(zeroPrefixNumber);
    return Controller.generateTenDigitNumbers(i - 1, randomNumbers, n + 1);
  }

  static async getPhoneNumbers(req, res) {
    try {
      let { batchID } = req.params;
      const allBatches = await Controller.getBatches();
      if (!allBatches.length) {
        return res.status(404).json({ error: 'No numbers have been generated' });
      }
      if (!batchID || batchID === 'undefined') [batchID] = allBatches;
      const { page, limit, sort } = req.query;
      let savedNumbers = await Utils.getSavedPhoneNumbers(batchID);

      if (sort === 'DESC') { // Sort phone numbers descending order
        savedNumbers = Utils.sortRecord(savedNumbers, false);
      }

      const { paginatedRecord, meta } = Utils
        .paginateRecords(savedNumbers, page, limit);

      return res.status(200)
        .json({
          message: 'Phone numbers successfully retrieved',
          phoneNumbers: paginatedRecord,
          minMaxPhoneNumbers: {
            maxNumber: savedNumbers[savedNumbers.length - 1],
            minNumber: savedNumbers[0],
          },
          batchID,
          meta,
        });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({ error });
    }
  }

  static async getBatches() {
    const fileNames = await fs.readdir(path.resolve(__dirname, '../db'));
    const extractID = name => (name.split('-')[1].replace(/\.txt/, ''));
    const batchIDs = fileNames.map(extractID);
    return batchIDs;
  }

  static async getBatchIDs(req, res) {
    try {
      const batchIDs = await Controller.getBatches();
      return res.status(200).json({
        message: 'Batch IDs retrieved successfully',
        batchIDs,
      });
    } catch (error) { // istanbul  ignore next
      return res.status(500).json({ error });
    }
  }
}

export default Controller;
