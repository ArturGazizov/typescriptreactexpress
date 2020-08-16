export {};//for errors://typescript cannot redeclare block-scoped variable //was already declared
let { DiagnosisEntry } = require('../src/types')

let  diagnosesData  = require('../data/diagnoses.ts')



const diagnoses: Array<typeof DiagnosisEntry> = diagnosesData;


var getEntries = (): Array<typeof DiagnosisEntry> => {  return diagnoses;};


var addEntry = () => {
  return null;
};



exports.getEntries=getEntries

exports.addEntry=addEntry