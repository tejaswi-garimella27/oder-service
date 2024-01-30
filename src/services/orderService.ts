import axios, { AxiosResponse } from "axios";

export class OrderService {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getOrderById = async (pharmacyName: string, orderId: string) => {
    const orderIdUrl: string = `/${pharmacyName.toLowerCase()}/orders/${orderId}`;
    const orderDetails: AxiosResponse = await axios.get(
      `${this.baseUrl}${orderIdUrl}`
    );
    return orderDetails.data;
  };

  getOrders = async (pharmacyName: string) => {
    const orderUrl: string = `/${pharmacyName.toLowerCase()}/orders/`;
    const orderDetails: AxiosResponse = await axios.get(
      `${this.baseUrl}${orderUrl}`
    );
    return orderDetails.data;
  };
  createOrder = async (pharmacyName: string, products: any): Promise<any> => {
    const createOrderUrl: string = `/${pharmacyName.toLowerCase()}/orders`;
    const response: AxiosResponse = await axios.post(
      `${this.baseUrl}${createOrderUrl}`,
      products
    );
    return response.data;
  };
}
