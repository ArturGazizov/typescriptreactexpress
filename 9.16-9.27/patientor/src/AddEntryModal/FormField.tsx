import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps,FieldInputProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { DiagnosisEntry,  } from "../types";





import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";


interface MyRadioProps extends FieldInputProps<""> {
    label: string;
    disabled:boolean;
}
//Omit<PatientEntry, 'ssn' | 'entries' >;
export const DatePickerField2: React.FC<Omit<MyRadioProps, 'value' | 'onBlur' >> = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

if(props.disabled)
  return null;

  return (<div>
    <label>{props.label}</label>
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    /></div>
  );
};


export const DatePickerField = ({ name, value, onChange,disabled ,label}) => {
    
if(disabled)
  return null;
    return (<div>
      <label>{label}</label>
        <DatePicker
            selected={(value && new Date(value)) || null}
            onChange={val => {
                onChange(name, val);
            }} 
        /></div>
    );
};


// structure of a single option
export type EntryOption = {
  value: "Hospital"|"OccupationalHealthcare"|"HealthCheck"|"None";
  label: string;
};
export type DiagnosisOption = {
  value: string;
  label: string;
};


// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);







// props for select field component
type SelectFieldProps2 = {
  name: string;
  label: string;
  options: DiagnosisOption[];
  disabled:boolean;
};


export const SelectField2: React.FC<SelectFieldProps2> = ({
  name,
  label,
  options,
  disabled
}: SelectFieldProps2) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown" disabled={disabled}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);








interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  disabled:boolean;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  disabled
}) => {return (

(disabled==false)?(
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} disabled={disabled}/>
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>)
:null


)};

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
  disabled:boolean;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max,disabled }) => (
  (disabled==false)?(
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} disabled={disabled}/>

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>)
:null
);











export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
  disabled,
  name
}: {
  diagnoses: DiagnosisEntry[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
  disabled:boolean;
  name:string;
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));


if (disabled)
  return null
  return (
    <Form.Field name={name}>
      <label>Diagnoses</label>
      <Dropdown
      name={name}
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
