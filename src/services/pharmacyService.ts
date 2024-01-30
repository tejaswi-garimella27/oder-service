import axios from "axios";
import { Pharmacy } from "../types/pharmacy";
import { EnvVariables } from "../types/env";

export class PharmacyService {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getPharmacyList = async (): Promise<Pharmacy[]> => {
    const phamarcyList = await axios.get(`${this.baseUrl}/pharmacy`);
    return phamarcyList.data;
  };

  getOrderById = async (pharmacyName: string, orderId: string) => {
    const orderIdUrl = `/${pharmacyName.toLowerCase()}/orders/${orderId}`;
    const orderDetails = await axios.get(`${this.baseUrl}${orderIdUrl}`);
    return orderDetails.data;
  };

  getOrders = async (pharmacyName: string) => {
    const orderUrl = `/${pharmacyName.toLowerCase()}/orders/`;
    console.log("orderUrl----->",orderUrl)
    const orderDetails = await axios.get(`${this.baseUrl}${orderUrl}`);
    return orderDetails.data;
  };
  createOrder = async (pharmacyName: string, products: any): Promise<any> => {
    const OrderUrlByID = `/${pharmacyName.toLowerCase()}/orders`;
    console.log("OrderUrlByID----->",OrderUrlByID)
    const response = await axios.post(
      `${this.baseUrl}${OrderUrlByID}`,
      products
    );
    return response.data;
  };
}
