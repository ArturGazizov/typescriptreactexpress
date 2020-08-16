import { NewPatientEntry, Gender ,Entry} from './types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
}



const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};



const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender;
};


/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object:any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
   name:parseName(object.name),
   dateOfBirth:parseDate(object.dateOfBirth),
   ssn:parseName(object.ssn),
   gender:parseGender(object.gender),
   occupation:parseName(object.occupation),
   entries:object.entries
  }

  return newEntry;
}




export const toNewEntry = (object:any): Entry => {






const isEntry = (object: any): object is Entry => {


function allstring(x) {
    return x.every(i => (typeof i === "string"));
}

return((
isString(object.description)&&
isString(object.date)&&isString(object.specialist)
&&(
  (Array.isArray(object.diagnosisCodes)&&allstring(object.diagnosisCodes))||object.diagnosisCodes==undefined
  )
)&&(
((object.type=="OccupationalHealthcare")&&(  (object.sickLeave==undefined)||( isString(object.sickLeave.endDate) && isString(object.sickLeave.startDate)&&isString(object.sickLeave.employerName)   )   )  )||
((object.type=="Hospital")&&  isString(object.discharge.criteria)&&  isString(object.discharge.date)  )
||
(
(object.type=="HealthCheck")&&((typeof object.healthCheckRating == 'number')&&( [0,1,2,3].includes(object.healthCheckRating) ))
  ))
)

};



  console.log(object)

if (!isEntry(object))
throw new Error('Malformated entry');

/**/

  const newEntry: Entry = object  ;

  return newEntry;
}





export default toNewPatientEntry;

