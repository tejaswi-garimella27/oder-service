import expres, { Request, Response } from "express";
import { OrderService } from "../services/orderService";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  createOrder = (req: Request, resp: Response) => {
    const { pharmacyOrderId, products } = req.body;
    const order = this.orderService.createOrder(products, pharmacyOrderId);
    resp.json(order).sendStatus(201);
  };

  getOrders = (req: Request, resp: Response) => {
    const ordersList = this.orderService.getOrders();
    resp.json(ordersList).sendStatus(201);
  };
}

export default OrderController;
