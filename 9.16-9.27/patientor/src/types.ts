
//export type Gender = 'male' | 'female' | 'other';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
//export interface Entry {
//}


export interface Genderdictionary
{
  male : 'mars';
  female : 'venus';
  other : 'transgender alternate';
}



export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface PatientEntry {
   id:string;
   name:string;
   dateOfBirth:string;
   ssn:string;
   gender:Gender;
   occupation:string;
   entries: Entry[];
}


export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}



export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
}


export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge
{date:string;
    criteria:string}


export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

export interface Sickleave
{startDate:string;
    endDate:string}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave:Sickleave|undefined;
}




export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;



export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;


export type NewEntry =  Omit<Entry, 'id'>;

