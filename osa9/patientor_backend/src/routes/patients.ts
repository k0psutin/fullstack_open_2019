import express from 'express'
import patientService from '../services/patientService'
import entryService from '../services/entryService'
import { Entry } from '../types'
import { toNewPatient, toNewEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    return res.send(patientService.getPublicPatients())
})

router.get('/:id', (req, res) => {
    try {
        res.send(patientService.getPublicPatient(req.params.id))
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body)
        const addedPatient = patientService.addPatient(newPatient)
        res.json(addedPatient)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry: Entry = toNewEntry(req.body)
        console.log('Returned entry', newEntry)
        const addedEntry = entryService.addEntry(req.params.id, newEntry)
        res.json(addedEntry)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

export default router