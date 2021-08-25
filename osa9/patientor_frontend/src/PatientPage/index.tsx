import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient, Values } from "../types";
import { updatePatient, useStateValue } from "../state";
import PatientEntry from './PatientEntry';
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [ patient, setPatient ] = useState<Patient>();
  const { id } = useParams<{id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: Values) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`
      , values
      );
    patients[id].entries.push(newEntry);
    closeModal();
      } catch (e) {
        console.log(e.response);
        console.error(e.reponse?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown Error');
      }
  };

  useEffect(() => {
    const cache = patients[id];
    setPatient(cache);
    if (!cache || !cache.ssn) {
    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(response => {
        const updatedPatient = response.data;
        setPatient(updatedPatient);
        dispatch(updatePatient(updatedPatient));
      }).catch(error => {
        console.log(error.message);
      });
  }}, [id]);

  if (!patient) {
    return null;
  }

  return (
   <>
   <PatientEntry patient={patient} />
   <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
   </>
  );
};

export default PatientPage;
