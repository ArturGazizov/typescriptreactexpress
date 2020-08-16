import { State } from "./state";
import { PatientEntry,PublicPatient,DiagnosisEntry,Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: PublicPatient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: PatientEntry;
    }
  | {
      type: "SET_PATIENT";
      payload: PatientEntry;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: DiagnosisEntry[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    }
  |{
      type: "NONE";
    };  




export const setdiagnoses = (diagnosis:DiagnosisEntry[]):Action=>{
return({ type: "SET_DIAGNOSES", payload: diagnosis });

}

export const setpatient = (patient):Action=>{
return({ type: "SET_PATIENT", payload: patient });

}

export const submitpatient = (patient):Action=>{
return({ type: "ADD_PATIENT", payload: patient });

}

export const fetchingpatients = (patients):Action=>{
return({ type: "SET_PATIENT_LIST", payload: patients });

}



export const submitentry = (entry):Action=>{
return({ type: "ADD_ENTRY", payload: entry });
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {


case "SET_DIAGNOSES":
return {
        ...state,
        diagnoses: 
          [...action.payload]
        
      };





case "ADD_ENTRY":
{
if (state.patient)
state.patient.entries.push(action.payload)

return {
        ...state,        
      };

    }



    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "NONE":
      return state;
    default:
      return state;
  }
};
