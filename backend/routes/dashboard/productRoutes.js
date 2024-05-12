const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/dashboard/productController')

router.post('/add-product', authMiddleware, productController.addProduct)
// router.get('/get-category', authMiddleware, categoryControllers.get_category)


module.exports = router