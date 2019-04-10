import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

class Controller {
  static async generatePhoneNumbers(req, res) {
    try {
      // Get existing phone numbers from file storage
      const fileStoragePath = process.env.FILE_STORAGE_PATH;
      const pathName = path.resolve(__dirname, fileStoragePath);
      const savedNumbers = await fs.readFile(pathName, 'utf-8');
      const savedNumbersToJSON = JSON.parse(savedNumbers);

      const generatedNumbers = Controller.generateTenDigitNumbers(1000);

      // Add generated numbers to top of file
      savedNumbersToJSON.unshift(...generatedNumbers);

      // Save unique phone numbers to file storage
      await fs.writeFile(pathName, JSON.stringify([...new Set(savedNumbersToJSON)]));

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
}

export default Controller;
