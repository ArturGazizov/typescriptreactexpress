export {};//for errors://typescript cannot redeclare block-scoped variable //was already declared
let  patientsData  = require('../data/patients.ts')


let {v4} = require('uuid')





let { NewPatientEntry,PatientEntry,PublicPatientEntry, Entry} = require('../src/types')//, Gender 
let patients: Omit<typeof PatientEntry,'ssn'>[] = patientsData;
var getEntries = (): typeof PublicPatientEntry[] => {  //Omit<typeof PatientEntry,'ssn'>[] => {  


return patients.map(({ id,name,dateOfBirth,gender,occupation }) => 
	({    id,name,dateOfBirth,gender,occupation  }));

};


var addPatientEntry = (
    entry:typeof NewPatientEntry
  ): typeof PatientEntry => {

const patientsIds=patients.map((p)=>p.id)

var newid=v4()

while (patientsIds.includes(newid))
	newid=v4()


const newPatientEntry = {
    id: newid,
    ...entry,
    entries:[]  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};




const findById = (id: number): typeof PatientEntry| undefined => 
{  const entry = patients.find(d => d.id === id);  return entry;};







var addEntry = (
    entry:typeof Entry, id:string
  ): typeof Entry => {

const entriesIds=(patients.reduce((memo,p)=>memo.concat(p.entries),[]))
.map((e)=>e.id)

var newid=v4()

while (entriesIds.includes(newid))
	newid=v4()


let entriedpatient=patients.find((p)=>p.id==id)

if (entriedpatient){

entry.id=newid

if (entriedpatient.entries)
entriedpatient.entries=entriedpatient.entries.concat([entry])
else
entriedpatient.entries=[entry]


patients=[...patients.filter((p)=>p.id!=id),entriedpatient]
}

  return entry;
};







exports.getEntries=getEntries

exports.addPatientEntry=addPatientEntry

exports.addEntry=addEntry

exports.findById=findById