import axios, { AxiosResponse } from "axios";
import { Pharmacy } from "../types/pharmacy";
import { CONSTANTS } from "../ApiConstants";
import { CarePlusOrderPayload, HealthMartOrderPayload, QuickCareOrderPayload } from "../types/pharmacy";

export class PharmacyService {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getPharmacyList = async (): Promise<Pharmacy[]> => {
    const phamarcyList: AxiosResponse = await axios.get(
      `${this.baseUrl}${CONSTANTS.PHARMACY_LIST_URL}`
    );
    return phamarcyList.data;
  };

  getOrderById = async (
    pharmacyName: string,
    orderId: string
  ): Promise<AxiosResponse> => {
      const orderIdUrl: string = `/${pharmacyName.toLowerCase()}${CONSTANTS.PHARMACY_ORDERS_URL}/${orderId}`;
      const orderDetails: AxiosResponse = await axios
        .get(`${this.baseUrl}${orderIdUrl}`)

        if (!orderDetails.data) {
          throw new Error(CONSTANTS.NULL_ERROR.toString());
        }
      return orderDetails.data;
  };

  getOrders = async (pharmacyName: string): Promise<AxiosResponse> => {
      const orderUrl: string = `/${pharmacyName.toLowerCase()}${CONSTANTS.PHARMACY_ORDERS_URL}`;
      const orderDetails = await axios.get(
        `${this.baseUrl}${orderUrl}`
      )
      if (!orderDetails.data) {
        throw new Error(CONSTANTS.NULL_ERROR.toString());
      }
      return orderDetails.data;
  };

  createOrder = async (
    pharmacyName: string,
    products: HealthMartOrderPayload|QuickCareOrderPayload|CarePlusOrderPayload
  ): Promise<AxiosResponse> => {
      const createOrderUrl: string = `/${pharmacyName.toLowerCase()}${CONSTANTS.PHARMACY_ORDERS_URL}`;
      const newOrder: AxiosResponse = await axios
        .post(`${this.baseUrl}${createOrderUrl}`, products)
        if (!newOrder.data) {
          throw new Error(CONSTANTS.NULL_ERROR.toString());
        }
      return newOrder.data||{};
  };
}
