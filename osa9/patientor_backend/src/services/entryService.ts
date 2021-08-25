import patientData from '../../data/patients'
import { Entry, Patient } from '../types'
import {v1 as uuid} from 'uuid'

const patients: Patient[] = patientData

const addEntry = (patient_id: string, entry: Entry): Entry => {
    const patient = patients.find(patient => patient.id === patient_id)

    if (!patient) {
        return {} as Entry
    }

    entry.id = uuid()
    
    patients.map(patient => {
        if(patient.id === patient_id) {
            patient.entries.push(entry)
        }
    })

    return entry
}

export default {
    addEntry
}