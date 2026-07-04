const asyncHandler = require('express-async-handler')


const getGoals = asynchandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

const setGoal = asynchandler(async (req, res) => {
    if(!req.body.text) {
        return res.status(400)

        throw new Error('Please add a text field')
    }

     res.status(200).json({ message: 'set goals' })
})

const updateGoal = asynchandler(async (req, res) => {
    res.status(200).json({ message: `update goal ${req.params.id}` })
})

const getGoal = asynchandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

const deleteGoal = asynchandler(async (req, res) => {
    res.status(200).json({ message: `delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    getGoal,
    deleteGoal
}