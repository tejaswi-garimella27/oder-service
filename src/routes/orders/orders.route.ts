import express, { Request, Response, Router } from "express";
import OrderController from "../../controllers/order";
import { OrderService } from "../../services/orderService";
import { CONSTANTS } from "../../ApiConstants";

const router: Router = express.Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);

router

  .get("/orders", async (req: Request, resp: Response) => {
    try {
      return await orderController.getInternalOrders(req, resp);
    } catch (error) {
      resp.status(500).json({ error: CONSTANTS.UNABLE_TO_FETCH_INTERNAL_ORDER.toString() });
    }
  })
  .post("/orders", async (req: Request, resp: Response) => {
    try {
      return await orderController.createInternalOrders(req, resp);
    } catch (error) {
      console.log("errpr------>",error)
      resp.status(500).json({ error: CONSTANTS.UNABLE_TO_CREATE_INTERNAL_ORDER.toString() });
    }
  });

export default router;
