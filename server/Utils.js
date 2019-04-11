import dotenv from 'dotenv';
import path from 'path';
import { promises as fs } from 'fs';

dotenv.config();
class Utils {
  static paginateRecords(records, pageQuery, limitQuery) {
    const page = pageQuery > 0 ? +pageQuery : 1;
    const limit = limitQuery > 0 ? +limitQuery : 10;
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

  static async getSavedPhoneNumbers() {
    const pathName = Utils.getFileStoragePath();
    const savedNumbers = await fs.readFile(pathName, 'utf-8');
    return (JSON.parse(savedNumbers));
  }

  // Get path for file storage: for test or development
  static getFileStoragePath() {
    const fileStoragePath = process.env.FILE_STORAGE_PATH;
    const pathName = path.resolve(__dirname, fileStoragePath);
    return pathName;
  }

  static sortRecord(record, ascending = true) {
    if (ascending) {
      return record.sort((firstNum, secondNum) => firstNum - secondNum);
    }
    return record.sort((firstNum, secondNum) => secondNum - firstNum);
  }
}

export default Utils;
