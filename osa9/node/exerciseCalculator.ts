interface returnObject {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const roundTo = (num: number, places: number): number => {
    const factor = (10 ** places)
    return Math.round(num * factor) / factor
}

const calculateExercises = (target: number, arr: number[]): returnObject => {
    const periodLength: number = arr.length
    const trainingDays: number = arr.filter((num: number) => (num > 0)).length
    const success = false
    const rating: number = roundTo(((trainingDays/periodLength) * target), 2)
    const ratingDescription: string = (rating > (target*0.75)) ? 'Excellent!' : (rating < (target * 0.5)) ? 'You can do better.' : 'Good, almost there!'
    const average: number = roundTo((arr.reduce((acc, curr) => acc + curr, 0) / periodLength), 2)

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

export default calculateExercises
