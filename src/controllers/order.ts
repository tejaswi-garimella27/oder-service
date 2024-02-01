import { Request, Response } from "express";
import { OrderService } from "../services/orderService";
import { Order } from "../types/order";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }
 
  getInternalOrders = async (
    req: Request,
    resp: Response
  ): Promise<Response> => {
    const ordersList = await this.orderService.getInternalOrders();
    return resp.json(ordersList);
  };

  createInternalOrders = async (
    req: Request,
    resp: Response
  ): Promise<Response> => {
    const products :string[]= req.body.products;
    const pharmacyId: string = req.body.pharmacyOrderId;
    const ordersList: Order = await this.orderService.createInternalOrders(
      products,
      pharmacyId
    );
    return resp.json(ordersList);
  };
}

export default OrderController;
