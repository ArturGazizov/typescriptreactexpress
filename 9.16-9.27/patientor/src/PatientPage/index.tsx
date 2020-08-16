//import React, { useState ,useEffect} from 'react';
import React from 'react';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { PatientEntry,Entry, DiagnosisEntry
  } from "../types";



  import AddEntryModal from "../AddEntryModal";

  import { Icon,Button } from 'semantic-ui-react'

import {Genderdictionary,HospitalEntry,OccupationalHealthcareEntry,HealthCheckEntry } from "../types";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import { MyContext } from "../App";

import {StateContext,setpatient,setdiagnoses} from "../state";

import {Table } from "semantic-ui-react";
import {
  useParams} from "react-router-dom"
import HealthRatingBar from "../components/HealthRatingBar";

import { useStateValue } from "../state";

import { submitentry } from "../state";


  import { apiBaseUrl } from "../constants";

  interface RouteParams {
    id: string
}


interface PatientProps {
  context?: object;
  settingpatient:(id:string)=>Promise<void>;
}




const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};



const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => 
{
  const [{diagnoses}, ] = useStateValue();


return(<div>
<React.Fragment>
<Table.Row key={entry.id}>
              <Table.Cell>id:{entry.id}</Table.Cell>
              <Table.Cell>description:{entry.description}</Table.Cell>
              <Table.Cell><Icon name='calendar alternate'/>:{entry.date}</Table.Cell>
              <Table.Cell>specialist:{entry.specialist}</Table.Cell>
              
{
((entry.diagnosisCodes==undefined)||(diagnoses==undefined))
          ? null          :
          (<Table.Cell>{entry.diagnosisCodes.
            map((dc)=>{var addition=diagnoses.find((diagnosis)=>diagnosis.code==dc);var addition2='';if (addition) addition2=addition.name;return (<div>{dc+" "+addition2}</div>)})}</Table.Cell>)
}

<Table.Cell>discharge: {entry.discharge.date+"  "+entry.discharge.criteria}</Table.Cell>
</Table.Row>
</React.Fragment>

  </div>)
}


const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {

const [{diagnoses}, ] = useStateValue();

return (<div><React.Fragment>


<Table.Row key={entry.id}>
              <Table.Cell>id:{entry.id}</Table.Cell>
              <Table.Cell>description:{entry.description}</Table.Cell>
              <Table.Cell><Icon name='calendar alternate'/>:{entry.date}</Table.Cell>
              <Table.Cell>specialist:{entry.specialist}</Table.Cell>
{
((entry.diagnosisCodes==undefined)||(diagnoses==undefined))
          ? null          :
          (<Table.Cell>diagnoses:{entry.diagnosisCodes.
            map((dc)=>{var addition=diagnoses.find((diagnosis)=>diagnosis.code==dc);var addition2='';if (addition) addition2=addition.name;return (<div>{dc+" "+addition2}</div>)})}</Table.Cell>)
}
<Table.Cell>Employer:{entry.employerName}</Table.Cell>



{(!entry.sickLeave)?null:

(<Table.Cell>sick leave :  {JSON.stringify(entry.sickLeave)}</Table.Cell>)


}


</Table.Row>
  </React.Fragment></div>);
}






const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  const [{diagnoses}, ] = useStateValue();
return (<div><React.Fragment>
<Table.Row key={entry.id}>
<Table.Cell>id:{entry.id}</Table.Cell>
              <Table.Cell>description:{entry.description}</Table.Cell>
              <Table.Cell><Icon name='calendar alternate'/>:{entry.date}</Table.Cell>
              <Table.Cell>specialist:{entry.specialist}</Table.Cell>
{
((entry.diagnosisCodes==undefined)||(diagnoses==undefined))
          ? null          :
          (<Table.Cell>diagnoses:{entry.diagnosisCodes.
            map((dc)=>{var addition=diagnoses.find((diagnosis)=>diagnosis.code==dc);var addition2='';if (addition) addition2=addition.name;return (<div>{dc+" "+addition2}</div>)})}</Table.Cell>)
}
<Table.Cell>health rating: {entry.healthCheckRating}</Table.Cell>

</Table.Row>
</React.Fragment></div>)
}





const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
switch (entry.type) {
case "OccupationalHealthcare": return (<OccupationalHealthcareEntryDetails entry={entry}/>);
case "Hospital": return (<HospitalEntryDetails entry={entry}/>);
case "HealthCheck": return (<HealthCheckEntryDetails entry={entry}/>);
default: {assertNever(entry);return <div/>};
}}





const PatientPage: React.FC<PatientProps> = (props) => {
 const params = useParams<RouteParams>()

const [{patient,diagnoses}, dispatch] = useStateValue();

const state = React.useContext(StateContext);
console.log("state")
console.log(state)

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
const [error, setError] = React.useState<string | undefined>();

const submitNewEntry = async (values: EntryFormValues) => {
    try {

      console.log(values.diagnosisCodes)


if (patient)
{

let newvalues: {[k: string]: any} = {

description:values.description,
date:values.date,
specialist:values.specialist,
diagnosisCodes:values.diagnosisCodes,
type:values.type,
};


if (values.type=="HealthCheck")
newvalues.healthCheckRating=values.healthCheckRating



if (values.type=="Hospital")
newvalues.discharge={date:values.dischargedate,criteria:values.dischargecriteria}



if (values.type=="OccupationalHealthcare")
newvalues.sickLeave={employerName:values.employerName,startDate:values.sickleavestartDate,endDate:values.sickleaveendDate}



      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        //values

{newvalues}

      );
      
      dispatch(submitentry(newEntry));
}


      closeModal();
    } catch (e) {
      console.error(e);
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

const genderdictionaryicons : Genderdictionary={'male':'mars','female':'venus','other':'transgender alternate'}


const state2 = React.useContext(MyContext);
console.log("state2")
console.log(state2)




const id:string = params.id;
console.log(id)


/*
React.useEffect(() => {
  console.log('1');
dispatch({type: "NONE"})
 }, [dispatch]);
*/



//React.useEffect(() => {



    


if (props.context!=undefined)
if (Array.isArray(props.context))
if (props.context[0].patient!=undefined)
{

}

    const fetchPatient = async () => {
      try {


axios.get<void>(`${apiBaseUrl}/ping`);
const { data: patientFromApi } = await axios.get<PatientEntry>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setpatient(patientFromApi));

const { data: diagnoses } = await axios.get<DiagnosisEntry[]>(`${apiBaseUrl}/diagnoses/`);
        dispatch(setdiagnoses(diagnoses));


      } catch (e) {
        console.error(e);
      }

    };

if (patient==undefined)
  {fetchPatient();console.log("patient3")}


if (patient)
if (patient.id!=id)
{fetchPatient();console.log("patient3")} 


if(patient==undefined)
return(<div>


  
{

<StateContext.Consumer>
{context2 => (
            <React.Fragment>
                {JSON.stringify(context2)}
            </React.Fragment>
        )}
</StateContext.Consumer>

}


<MyContext.Consumer>
{context3 => (
            <React.Fragment>
                {JSON.stringify(context3)}
            </React.Fragment>
        )}
</MyContext.Consumer>


</div>)



  return (
    <div className="App">
  Count: {JSON.stringify(state2)}
<MyContext.Consumer>
{context3 => (
            <React.Fragment>
                {JSON.stringify(context3)}
            </React.Fragment>
        )}
</MyContext.Consumer>

{


<div>
<Table celled>



<Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>ssn</Table.HeaderCell>
            <Table.HeaderCell>Health rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>



        <Table.Body>
            <Table.Row key={patient.id}>
              <Table.Cell><a href={patient.id}>{patient.name}</a></Table.Cell>
              <Table.Cell><Icon name={genderdictionaryicons[patient.gender]}/></Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>{patient.ssn}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>

        </Table.Body>



      </Table>





<Table celled>


<Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
<Table.HeaderCell>Diagnose codes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>


{patient.entries.map((entry: Entry) => (

            <Table.Row key={entry.id}>
              <Table.Cell>{entry.date}</Table.Cell>
              <Table.Cell>{entry.description}</Table.Cell>
{
((entry.diagnosisCodes==undefined)||(diagnoses==undefined))
          ? null          :
          (<Table.Cell>{entry.diagnosisCodes.
            map((dc)=>{var addition=diagnoses.find((diagnosis)=>diagnosis.code==dc);var addition2='';if (addition) addition2=addition.name;return (<div>{dc+" "+addition2}</div>)})}</Table.Cell>)


}

              
            </Table.Row>

))}

        </Table.Body>


        
      </Table>
<Table celled>
        <Table.Body>
        {patient.entries.map((entry: Entry) => (<EntryDetails entry={entry}/>))}
        </Table.Body>
      </Table>

</div>




/**/
}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>


      </div>

        );


 return (
    <div className="App">

    </div>)
};

export default PatientPage;