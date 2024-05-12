const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/dashboard/productController')

router.post('/add-product', authMiddleware, productController.addProduct)
router.get('/get-products', authMiddleware, productController.products_get)
router.get('/get-product/:productId', authMiddleware, productController.product_get)
router.post('/update-product', authMiddleware, productController.product_update)
router.post('/product-image-update', authMiddleware, productController.product_image_update)

module.exports = router