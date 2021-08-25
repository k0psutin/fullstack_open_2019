import React from 'react';
import { OccupationalHealthCareEntry } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

interface SickleaveProps {
    sickleave: { startDate: string, endDate: string } | undefined
}

const SickLeave = ({sickleave}: SickleaveProps) => {
    if (!sickleave) {
        return null;
    }
    return (
        <>
        Sickleave: {sickleave.startDate} - {sickleave.endDate}
        </>
    );
};

interface EmployerProps {
    employerName: string;
}

const Employer = ({employerName}: EmployerProps) => {
    if (!employerName) {
        return null;
    }
    return (
        <b>{employerName}</b>
    );
};

const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
            const [{ diagnosis }] = useStateValue();
            return (
              <Card fluid key={entry.id}>
                  <Card.Content>
                      <Card.Header>
                          {entry.date} 
                          <Icon name="dollar sign" />
                          <Employer employerName={entry.employerName} />
                          <br />
                          <b>Specialist: </b> {entry.specialist}
                      </Card.Header>
                      <Card.Meta>
                          {entry.description}
                      </Card.Meta>
                      <Card.Content extra>
                      {entry.diagnosisCodes?.map((code, i) => <p key={i}>{code} {(diagnosis[code]) ? diagnosis[code].name : null}</p> )}
                         <SickLeave sickleave={entry.sickLeave} />
                      </Card.Content>
                  </Card.Content>
              </Card>
            );
};

export default OccupationalHealthcareEntry;