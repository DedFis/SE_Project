const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const categoryControllers = require('../../controllers/dashboard/categoryControllers')

router.post('/add-category', categoryControllers.add_category)
router.get('/get-category', authMiddleware, categoryControllers.get_category)


module.exports = router