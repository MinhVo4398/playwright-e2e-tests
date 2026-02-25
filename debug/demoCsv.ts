import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
// npx tsx debug/demoCsv.ts

const csvPath = path.resolve(
  `${process.cwd()}/data/functional/make-ampt-test-data.csv`,
);

const csvDataStr = fs.readFileSync(csvPath, { encoding: "utf-8" });
console.log(csvDataStr);
/**
 * 
testId,facility,hcp,visitDt
TC001,Tokyo CURA Healthcare Center,Medicare,05/10/2025
TC002,Hongkong CURA Healthcare Center,Medicaid,05/11/2025
TC003,Seoul CURA Healthcare Center,None,05/12/2025
 */

// Parse the csv data -> Array of data(install csv parse)
const csvDataArr = parse(csvDataStr, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});
console.log(csvDataArr);

/**
 [
  {
    testId: 'TC001',
    facility: 'Tokyo CURA Healthcare Center',
    hcp: 'Medicare',
    visitDt: '05/10/2025'
  },
  {
    testId: 'TC002',
    facility: 'Hongkong CURA Healthcare Center',
    hcp: 'Medicaid',
    visitDt: '05/11/2025'
  },
  {
    testId: 'TC003',
    facility: 'Seoul CURA Healthcare Center',
    hcp: 'None',
    visitDt: '05/12/2025'
  }
]
 */

// Make the above code as re-usable function
function readCSV(filePath: string): any[] {
  const csvDataStr = fs.readFileSync(filePath, { encoding: "utf-8" });
  const csvDataArr = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return csvDataArr;
}

console.log("-------UNIT TEST-----------");
// Unit Testing
const csvData = readCSV(csvPath);
console.log(csvData);
console.log(csvData[0].testId); // TC001 - define kiểu trả về  ở hàm sẽ hết lỗi 
 