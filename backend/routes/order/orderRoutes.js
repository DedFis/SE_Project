const router = require("express").Router();
const orderController = require("../../controllers/order/orderController");

router.post("/home/order/place-order", orderController.place_order);
router.get("/home/customer/get-dashboard-data/:userId", orderController.get_customer_databoard_data);

module.exports = router;

// const customerAuthController = require("../../controllers/home/cardController");
