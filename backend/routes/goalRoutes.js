const express = require('express')
const router  = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalcontroller')

const protect = require('../middleware/authMiddleware')

router.use(protect)

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router