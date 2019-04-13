import dotenv from 'dotenv';
import path from 'path';
import { promises as fs } from 'fs';

dotenv.config();
class Utils {
  static paginateRecords(records, pageQuery, limitQuery) {
    const page = pageQuery > 0 ? +pageQuery : 1;
    const limit = limitQuery > 0 ? +limitQuery : 150;
    const recordCount = records.length;
    const pagesCount = Math.ceil(recordCount / limit);
    const offset = (page - 1) * limit;
    const paginatedRecord = records.slice(offset, offset + limit);
    return {
      paginatedRecord,
      meta: {
        totalCount: recordCount,
        pagesCount,
        currentPage: page,
        limit,
      },
    };
  }

  static async getSavedPhoneNumbers(timeStamp) {
    const filePathName = Utils.getFileStoragePath(timeStamp);
    const savedNumbers = await fs.readFile(filePathName, 'utf-8');
    return savedNumbers.split(',');
  }

  // Get path for file storage path
  static getFileStoragePath(timeStamp) {
    const fileStoragePath = `./db/numbers-${timeStamp}.txt`;
    const pathName = path.resolve(__dirname, fileStoragePath);
    return pathName;
  }

  static sortRecord(record, ascending = true) {
    const result = record.sort((firstNum, secondNum) => firstNum - secondNum);
    if (!ascending) {
      result.reverse();
    }
    return result;
  }
}

export default Utils;
