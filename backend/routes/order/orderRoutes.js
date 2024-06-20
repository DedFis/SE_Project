const router = require("express").Router();
const orderController = require("../../controllers/order/orderController");

router.post("/home/order/place-order", orderController.place_order);
router.get("/home/customer/get-dashboard-data/:userId", orderController.get_customer_databoard_data);
router.get("/home/customer/get-orders/:customerId/:status", orderController.get_orders);
router.get("/home/customer/get-order/:orderId", orderController.get_order);

router.get("/admin/orders", orderController.getAdminOrders);
router.get("/admin/order/:orderId", orderController.get_admin_order);
router.put("/admin/order-status/update/:orderId", orderController.admin_order_status_update);

router.get("/seller/orders/:sellerId", orderController.getSellerOrders);
router.get("/seller/order/:orderId", orderController.get_seller_order);
router.put("/seller/order-status/update/:orderId", orderController.seller_order_status_update);

module.exports = router;

// const customerAuthController = require("../../controllers/home/cardController");
