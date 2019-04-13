import { promises as fs } from 'fs';
import Utils from '../Utils';

class Controller {
  static async generatePhoneNumbers(req, res) {
    try {
      // Get existing phone numbers from file storage
      const savedNumbers = await Utils.getSavedPhoneNumbers();

      const generatedNumbers = Controller.generateTenDigitNumbers(1000);

      // Add generated numbers to top of file
      savedNumbers.unshift(...generatedNumbers);

      // Save unique phone numbers to file storage
      const pathName = Utils.getFileStoragePath();
      await fs.writeFile(pathName, JSON.stringify([...new Set(savedNumbers)]));

      return res.status(201)
        .json({
          message: 'New phone numbers successfully generated',
          generatedNumbers,
        });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({ error });
    }
  }

  // Generate random 10 digit numbers
  static generateTenDigitNumbers(i, n = 0, randomNumbers = []) {
    if (i === 0) return randomNumbers;
    const newNumber = Math.floor((Math.random() * 900000000) + 100000000);
    const zeroPrefixNumber = `0${newNumber}`;
    randomNumbers.push(zeroPrefixNumber);
    return Controller.generateTenDigitNumbers(i - 1, n + 1, randomNumbers);
  }

  static async getPhoneNumbers(req, res) {
    try {
      let savedNumbers = await Utils.getSavedPhoneNumbers();
      const { page, limit, sort } = req.query;

      if (sort === 'ASC') { // Sort phone numbers ascending order
        savedNumbers = Utils.sortRecord(savedNumbers);
      }
      if (sort === 'DESC') { // Sort phone numbers descending order
        savedNumbers = Utils.sortRecord(savedNumbers, false);
      }

      const { paginatedRecord, meta } = Utils
        .paginateRecords(savedNumbers, page, limit);
      return res.status(200)
        .json({
          message: 'Phone numbers successfully retrieved',
          phoneNumbers: paginatedRecord,
          meta,
        });
    } catch (error) { // istanbul ignore next
      return res.status(500).json({ error });
    }
  }

  static async getMinMaxNumber(req, res) {
    try {
      const savedPhoneNumbers = await Utils.getSavedPhoneNumbers();
      if (!savedPhoneNumbers.length) {
        return res.status(404).json({
          error: 'No numbers have been generated',
        });
      }
      const sortedPhoneNumbers = Utils.sortRecord(savedPhoneNumbers);

      return res.status(200).json({
        message: 'Min and max phone numbers successfully retrieved',
        minMaxPhoneNumbers: {
          minNumber: sortedPhoneNumbers[0],
          maxNumber: sortedPhoneNumbers[sortedPhoneNumbers.length - 1],
        },
      });
    } catch (error) { // istanbul  ignore next
      return res.status(500).json({ error });
    }
  }

  static async deletePhoneNumbers(req, res) {
    try {
      const pathName = Utils.getFileStoragePath();
      await fs.writeFile(pathName, JSON.stringify([]));
      return res.status(200).json({
        message: 'Phone Numbers deleted successfully',
      });
    } catch (error) { // istanbul  ignore next
      return res.status(500).json({ error });
    }
  }
}

export default Controller;
