import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Entry, Values } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, EntryTypeOption, NumberField, TextField, SelectTypeField } from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id">;

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Health Check' }
];

type ViewValues = Omit<Entry, "id" | "specialist" | "date" | "description">;

const View = ({ type }: ViewValues) => {
  switch (type) {
    case "HealthCheck":
       return (
         <>
        <Field
        label="Health Rating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />
      </>
       );
    case "Hospital":
      return (
        <>
      <Field
      label="Discharge Date"
      name="discharge.date"
      value="dischargeDate"
      component={TextField}
    />
     <Field
      label="Discharge Criteria"
      name="discharge.criteria"
      component={TextField}
    />
    </>
       );
    case "OccupationalHealthcare":
      return (
        <>
         <Field
        label="Employer Name"
        name="employerName"
        component={TextField}
      />
       <Field
      label="Sickleave Start"
      name="sickLeave.startDate"
      component={TextField}
    />
     <Field
      label="Sickleave End"
      name="sickLeave.endDate"
      component={TextField}
    />
      </>
       );
    default:
      return null;
  }
};

interface Props {
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}

interface ErrorValue {
  [field: string]: string;
}

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        type: 'Hospital',
        diagnosisCodes: [],
        employerName: '',
        healthCheckRating: 0
      }}
      onSubmit={onSubmit} 
      validate={values => {
        const requiredError = "Field is required";
        const errors: ErrorValue = {};
        const type = values.type;

        if (values.healthCheckRating) {
          if (values.healthCheckRating > 3 || values.healthCheckRating < 0 ){
            errors.healthCheckRating = requiredError;
          }
        }

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!values.employerName && type === 'OccupationalHealthcare') {
          errors.employerName = requiredError;
        }
        return errors;
      }}
      >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectTypeField 
              label='Entry Type'
              name='type'
              options={entryTypeOptions}
            />
            <DiagnosisSelection 
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnosis={Object.values(diagnosis)}
            />
            <Field
                label="Specialist"
                placeholder="specialist"
                name="specialist"
                component={TextField}
            />
            
            <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
            />
            <Field
                label="Description"
                placeholder="description"
                name="description"
                component={TextField}
            />
            <View type={values.type} />
           
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
