import React from 'react';
import { HospitalEntry } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

interface DischargeProps {
    discharge: { date: string, criteria: string } | undefined
}

const Discharge = ({discharge}: DischargeProps) => {
    if (!discharge) {
        return null;
    }
    return (
        <>
        <p>Discharge date: {discharge.date}</p>
        <p>Criteria: {discharge.criteria}</p>
        </>
    );
};

const HospitalEntryCard = ({entry}: {entry: HospitalEntry}) => {
            const [{ diagnosis }] = useStateValue();
            return (
              <Card fluid key={entry.id}>
                  <Card.Content>
                      <Card.Header>
                          {entry.date} 
                          <Icon name="hospital outline" />
                          <br />
                          <b>Specialist: </b> {entry.specialist}
                      </Card.Header>
                      <Card.Meta>
                          {entry.description}
                      </Card.Meta>
                      <Card.Content extra>
                      {entry.diagnosisCodes?.map((code, i) => <p key={i}>{code} {(diagnosis[code]) ? diagnosis[code].name : null}</p> )}
                      <Discharge discharge={entry.discharge} />
                      </Card.Content>
                  </Card.Content>
              </Card>
            );
};

export default HospitalEntryCard;