import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {DatePickerField2, DatePickerField,TextField, SelectField, EntryOption,NumberField,DiagnosisSelection } from "./FormField";

import { DiagnosisEntry } from "../types";


import { useStateValue } from "../state";
/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export interface EntryFormValues {
type:"None"|"Hospital"
  | "OccupationalHealthcare"
  | "HealthCheck"


description: string;
  date: string;
  specialist: string;
diagnosisCodes: string[];


healthCheckRating: 0|1|2|3;


dischargedate:string;
dischargecriteria:string;

sickleavestartDate:string;
sickleaveendDate:string;
  employerName: string;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  diagnoses:DiagnosisEntry[];
}

const entryOptions: EntryOption[] = [
  { value: "None", label: "None" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "HealthCheck", label: "Health Check" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {


const [entrytype, setEntrytype] = React.useState<string | undefined>();
const [{diagnoses}, ] = useStateValue();




  return (
    <Formik
      initialValues={{
type:"None",

description: "",
  date: "",
  specialist: "",
diagnosisCodes: [],


healthCheckRating: 3,


dischargedate:"",
dischargecriteria:"",

sickleavestartDate:"",
sickleaveendDate:"",
  employerName: ""


      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";



        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        setEntrytype(values.type)


        if (values.description=='') {
          errors.description = requiredError;
        }

        if (!Boolean(Date.parse(values.date))) {
          errors.date = "malformated date";
        }

        if (values.specialist=='') {
          errors.specialist = requiredError;
        }


         if (values.type=="Hospital") {

            if (!Boolean(Date.parse(values.dischargedate)))  {
                      errors.dischargedate = requiredError;
                    }
            if (values.dischargecriteria=="") {
                      errors.dischargecriteria = requiredError;
                    }
        }



            if ((values.type=="OccupationalHealthcare")&&(values.employerName=="")) {
                      errors.employerName = requiredError;
                    }
            if ((values.type=="OccupationalHealthcare")&&(  !Boolean(Date.parse(values.sickleavestartDate)) )) {

                      errors.sickleavestartDate = "malformated date";
                    }
            if ((values.type=="OccupationalHealthcare")&&(  !Boolean(Date.parse(values.sickleaveendDate)) )) {
                      errors.sickleaveendDate = "malformated date";

                    }


   
if(!([0,1,2,3].includes(values.healthCheckRating)))
errors.healthCheckRating = "should be 0 ,1, 2 or 3";



        /*
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }*/
        return errors;
      }}
    >
      {({ isValid, dirty,setFieldTouched, setFieldValue,values }) => {
        return (
          <Form className="form ui">





<SelectField
              label="Type"
              name="type"
              options={entryOptions}
            />


<DiagnosisSelection
diagnoses={diagnoses}
name="diagnosisCodes"
setFieldValue={setFieldValue}
  setFieldTouched={setFieldTouched}
disabled={!(entrytype)}

/>

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              disabled={!(entrytype)}
            />

            <DatePickerField
            label="date"
            name="date"
            value={values.date}
            onChange={setFieldValue}
            disabled={!(entrytype)}
            />




            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              disabled={!(entrytype)}
            />





             <Field
              label="Health check rating"
              placeholder="Health check rating number"
              name="healthCheckRating"
              component={NumberField}
              disabled={entrytype!="HealthCheck"}
            />





            <DatePickerField2
            label="date of discharge"
            name="dischargedate"
            disabled={entrytype!="Hospital"}
            onChange={(val) => setFieldValue('dischargedate', val)}
            />


            <Field
              label="criteria of discharge"
              placeholder="criteria of discharge"
              name="dischargecriteria"
              component={TextField}
              disabled={entrytype!="Hospital"}
            />




            <DatePickerField2
            label="start of sickleave"
            name="sickleavestartDate"
            disabled={entrytype!="OccupationalHealthcare"}
            onChange={(val) => setFieldValue('sickleavestartDate', val)}
            />
            <DatePickerField2
            label="end of sickleave"
            name="sickleaveendDate"
            disabled={entrytype!="OccupationalHealthcare"}
            onChange={(val) => setFieldValue('sickleaveendDate', val)}
            />

            <Field
              label="name of employer"
              placeholder="name of employer"
              name="employerName"
              component={TextField}
              disabled={entrytype!="OccupationalHealthcare"}
            />






            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
