import { CONSTANTS } from "../ApiConstants";
import { Order } from "../types/order";

export class OrderService {
  private orders: Order[] = [];

  createInternalOrders(products: string[], pharmacyOrderId: string): Order {

    if (!products.length) {
      throw new Error(CONSTANTS.INVALID_PRODUCTS_LENGTH.toString());
    }

    const order: Order = {
      id: Date.now().toString(),
      products,
      pharmacyOrderId,
    };
    this.orders.push(order);
    return order;
  }

  getInternalOrders(): Order[] {
    return this.orders;
  }

}
