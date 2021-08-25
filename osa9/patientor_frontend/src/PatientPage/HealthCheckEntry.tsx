import React from 'react';
import { HealthCheckEntry } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import HealthRating from './HealthRating';
import { useStateValue } from '../state';

const HospitalEntryCard = ({ entry }: { entry: HealthCheckEntry}) => {
        const [{ diagnosis }] = useStateValue();
            return (
              <Card fluid key={entry.id}>
                  <Card.Content>
                      <Card.Header>
                          {entry.date} 
                          <Icon name="user doctor" />
                          <br />
                          <b>Specialist: </b> {entry.specialist}
                      </Card.Header>
                      <Card.Meta>
                          {entry.description}
                      </Card.Meta>
                      <Card.Content extra>
                         {entry.diagnosisCodes?.map((code, i) => <p key={i}>{code} {(diagnosis[code]) ? diagnosis[code].name : null}</p> )}
                      </Card.Content>
                      <Icon color={HealthRating(entry.healthCheckRating)} name="heart" />
                  </Card.Content>
              </Card>
            );
};

export default HospitalEntryCard;