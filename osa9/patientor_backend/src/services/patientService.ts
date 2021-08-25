import patientData from '../../data/patients'

import {v1 as uuid} from 'uuid'

import { NewPatient, PublicPatient, Patient } from '../types'

const patients: Patient[] = patientData

const getPatients = (): Patient[] => {
    return patients
}

const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: [],
    }))
}

const getPublicPatient = (id: string): PublicPatient | undefined => {
    return patients.find(patient => patient.id === id)
}

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuid()
    const newPatientEntry = {
        id: id, ...patient, entry: []
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}

export default {
    getPatients,
    getPublicPatients,
    getPublicPatient,
    addPatient
}