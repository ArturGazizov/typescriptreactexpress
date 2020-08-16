import toNewPatientEntry,{toNewEntry} from "../src/utils";

var express =require('express');

let patientService =require('../services/patientsService');

var router = express.Router();






router.get('/:id', (req:any, res:any) => {

const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }

})





router.post('/:id/entries', (req:any, res:any) => {
  

/*
tests for postman

{
        "date": "2015-01-02",
        "type": "Hospital",
        "specialist": "MD House",
        "diagnosisCodes": ["S62.5"],
        "description":
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        "discharge": {
          "date": "2015-01-16",
          "criteria": "Thumb has healed."
        }
}




{
        
        "date": "2019-10-20",
        "specialist": "MD House",
        "type": "HealthCheck",
        "description": "Yearly control visit. Cholesterol levels back to normal.",
        "healthCheckRating": 0
      }


      {
        
        "date": "2019-09-10",
        "specialist": "MD House",
        "type": "OccupationalHealthcare",
        "employerName": "FBI",
        "description": "Prescriptions renewed."}



*/

//  	console.log('mazafaka')
//res.send(patientService.getEntries());
try {

    const NewEntry = toNewEntry(req.body.newvalues);
    const addedEntry = patientService.addEntry(NewEntry,req.params.id);    
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

})





// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.get('/', (_req:any, res:any) => {
  res.send(patientService.getEntries());

})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/', (req:any, res:any) => {
  

try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientEntry(NewPatientEntry);    
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

})

module.exports=router;