import FileSaver from 'file-saver';

class Helper {
  static saveNumbersToFile = (phoneNumbers, batch) => {
    const numbersTOCSV = phoneNumbers.join(',').replace(/,/g, '\n');
    const blob = new Blob([numbersTOCSV], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, `phoneNumbers-${batch}.txt`);
  };
}

export default Helper;
