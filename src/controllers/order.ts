import expres, { Request, Response } from "express";
import { OrderService } from "../services/orderService";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }
  createOrder = async (req: Request, resp: Response): Promise<Response> => {
    const body = req.body;
    const order = await this.orderService.createOrder(
      resp.locals.pharmacyName,
      body
    );
    return resp.json(order);
  };

  getOrders = async (req: Request, resp: Response): Promise<Response> => {
    const ordersList = await this.orderService.getOrders(
      resp.locals.pharmacyName
    );
    return resp.json(ordersList);
  };

  getOrderById = async (req: Request, resp: Response): Promise<Response> => {
    const id: string = req.params.id;
    const ordersList = await this.orderService.getOrderById(
      resp.locals.pharmacyName,
      id
    );
    return resp.json(ordersList);
  };
}

export default OrderController;
