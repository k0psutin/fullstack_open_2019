import React from 'react';
import { Entry, Patient } from "../types";
import { Icon } from "semantic-ui-react";

import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalCheckEntry from './OccupationalHealthcareEntry';

interface Props {
    patient: Patient;
}

const checkEntryType = (entry: Entry) => {
    if (!entry) {
        return null;
    }
    switch (entry.type) {
        case "HealthCheck":
            return (<HealthCheckEntry key={entry.id} entry={entry} />);
        case "Hospital":
            return (<HospitalEntry key={entry.id} entry={entry} />);
        case "OccupationalHealthcare":
            return (<OccupationalCheckEntry key={entry.id} entry={entry} />);
        default: 
            throw new Error('Unknown entry');
    }
};

const PatientEntry = ({patient}: Props) => {
      
      return (
        <div className="App">
          <h1>{patient.name} {patient.gender === 'female' ? <Icon name="venus" /> : patient.gender === 'other' ? <Icon name="genderless" /> : <Icon name="mars" />}</h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>entries</h3> 
          
          { patient.entries.map((entry) => checkEntryType(entry))}
        </div>
      );
};

export default PatientEntry;

