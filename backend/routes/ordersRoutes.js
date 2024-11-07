import express from "express";

const orderRoutes = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

orderRoutes
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);
orderRoutes.route("/mine").get(protect, getMyOrders);
orderRoutes.route("/:id").get(protect, getOrderById);
orderRoutes.route("/:id/pay").put(protect, updateOrderToPaid);
orderRoutes.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default orderRoutes;
