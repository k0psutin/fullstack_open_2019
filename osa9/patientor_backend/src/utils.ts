import { BaseEntry, Diagnosis, Entry, Gender, HealthCheckRating, HospitalEntry, NewPatient, OccupationalHealthCareEntry } from "./types"

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

const isSsn = (ssn: string): boolean => {
    if (!ssn) {
        return false
    }
    const re = /\d\d\d\d\d\d-(\d|\D)*/
    return (re.exec(ssn) !== null)
}

const parseName = (name: string): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name)
    }
    return name
}

const parseDateOfBirth = (dateOfBirth: string): string => {
    if (!dateOfBirth || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth)
    }
    return dateOfBirth
}

const parseSsn = (ssn: string): string => {
    if (!ssn || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn)
    }
    return ssn
}

const parseGender = (gender: string): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender
}

const parseOccupation = (occupation: string): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing name')
    }
    return occupation
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    }

    return newPatient
}

const parseDate = (date: string): string => {
    if (!date || !isDate(date)) {
       throw new Error('Incorrect or missing date')
    }
    return date
}

const parseString = (str: string, name: string): string => {
    if (!str || !isString(str)) {
       throw new Error(`Incorrect or missing ${name}`)
    }
    return str
}

interface DischargeProps {
    date: string
    criteria: string
}

const parseDischarge = ({ date, criteria }: DischargeProps) => {
    if (!date || !criteria) {
        throw new Error(`Incorrect or missing date and/or criteria`) 
    }
    if (!isDate(date)) {
        throw new Error(`Date is not a date`) 
    }
    return { date, criteria }
}


interface SickleaveProps {
    startDate: string;
    endDate: string;
}

const parseSickleave = ({ startDate, endDate }: SickleaveProps): SickleaveProps => {
    if (!startDate || !endDate) {
        throw new Error(`Incorrect or missing start and/ or enddate`) 
    }
    if (!isDate(startDate) || !isDate(endDate)) {
        throw new Error(`Start and/ or enddate are not in date form`) 
    }
    return { startDate, endDate }
}

const parseDiagnosis = (diagnosis?: Array<Diagnosis['code']>): Array<Diagnosis['code']> => {
    if (!diagnosis) {
        return []   
    }
    return diagnosis
}

const parseHealthRating = (rating: HealthCheckRating): HealthCheckRating => {
    if (rating >= 0 && rating <= 3) {
        return rating
    }
    throw new Error(
        `Incorrect or missing HealthCheckRating: ${rating}`
      );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): Entry => {
    const baseEntry: BaseEntry = {
        id: '',
        date: parseDate(object.date),
        description: parseString(object.description, 'description'),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosis(object.diagnosisCodes)
    }
    switch (object.type) {
        case 'HealthCheck':
            return {
                ...baseEntry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthRating(object.healthCheckRating)
            } 
        case 'OccupationalHealthcare':
            const occEntry = {
                ...baseEntry,
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName, 'employerName')
            }
            if (object.sickLeave) {
                const modEntry = {
                    ...occEntry,
                    sickLeave: parseSickleave(object.sickLeave)
                }
                return modEntry as OccupationalHealthCareEntry
            }
            return occEntry as OccupationalHealthCareEntry
        case 'Hospital':
            if (object.discharge) {
                return {
                    ...baseEntry,
                    type: 'Hospital'
                } as HospitalEntry
            }
            return {
                ...baseEntry,
                type: 'Hospital',
                discharge: parseDischarge(object.discharge),
            }
        default:
            throw new Error(
                `Incorrect or missing type`
              );
    }
}