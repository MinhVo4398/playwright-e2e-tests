import TestDat from '../data/test-data.ts';
// Run:  npx tsx debug/play.ts to run this file

const makeApptTestData =  TestDat.makeAppointmentTestData();

// Access the data

for(const apptData of makeApptTestData) {
    console.log(`Test data: ${JSON.stringify(apptData)}`);
}
