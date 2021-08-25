import express from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight) {
        return res.status(404).send(({ error: 'malformatted parameters' }))
    }
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    if (isNaN(height) || isNaN(weight)) {
        return res.status(404).send(({ error: 'only use integers as parameters' }))
    }

    const respond = calculateBmi(height, weight)

    return res.status(200).send(({
        weight,
        height,
        respond
    }))
})

app.post('/exercises', (req,res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const dailyExercises = req.body.dailyExercises as number[]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target)
    if (!dailyExercises || !target) {
        return res.send({ error: 'parameters missing' })
    }
    if (isNaN(target) || !(dailyExercises instanceof Array)) {
        return res.send({ error: 'malformatted parameters' })
    }

    if (isNaN(Number(dailyExercises[0]))) {
        return res.send({ error: 'malformatted parameters' })
    }

    const result = calculateExercises(target, dailyExercises)
    return res.send(result)
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})