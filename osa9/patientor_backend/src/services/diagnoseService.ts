import diagnoseData from '../../data/diagnosis.json'

import { Diagnosis } from '../types'

const diagnosis: Diagnosis[] = diagnoseData as Diagnosis[]

const getDiagnosis = (): Diagnosis[] => {
    return diagnosis;
}

const addDiagnose = () => {
    return null
}

export default {
    getDiagnosis,
    addDiagnose
}