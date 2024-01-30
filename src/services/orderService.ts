import { Order } from "../types/order";
import { generateOrderId } from "../utils/common";

export class OrderService {
  private orders: Order[] = [];

  createOrder = (products: string[], pharmaOrderId: string): Order => {
    const order: Order = {
      orderId: generateOrderId(),
      products,
      pharmaOrderId,
    };
    this.orders.push(order);
    return order;
  };

  getOrders = (): Order[] => {
    return this.orders;
  };
}
