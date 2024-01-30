import express, { Request, Response, Router } from "express";
import { OrderController } from "../controllers/order";
import { OrderService } from "../services/orderService";
import { ENV_VARIABLE } from "../utils/env";
import { getPharamcyName } from "../utils/common";

const orderService = new OrderService(ENV_VARIABLE.PHARMACY_BASE_URL);
const orderController = new OrderController(orderService);

const router: Router = express.Router();

router
  .all("*", (req: Request, resp: Response, next) => {
    getPharamcyName(req, resp);
    next();
  })
  .get(
    "/orders",
    async (req: Request, resp: Response) =>
      await orderController.getOrders(req, resp)
  )
  .post(
    "/orders",
    async (req: Request, resp: Response) =>
      await orderController.createOrder(req, resp)
  )
  .get(
    "/orders/:id",
    async (req: Request, resp: Response) =>
      await orderController.getOrderById(req, resp)
  );

export default router;
