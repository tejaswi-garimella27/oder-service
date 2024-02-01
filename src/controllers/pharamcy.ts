import { Request, Response } from "express";
import { PharmacyService } from "../services/pharmacyService";
import { Pharmacy } from "../types/pharmacy";
import { CONSTANTS } from "../ApiConstants";

export class PharmacyController {
  private pharmacyService: PharmacyService;
  constructor(pharmacyService: PharmacyService) {
    this.pharmacyService = pharmacyService;
  }
  getPharmacyList = async (req: Request, resp: Response): Promise<Response> => {
    const pharmacyList: Pharmacy[] =
      await this.pharmacyService.getPharmacyList();
    return resp.json(pharmacyList);
  };
  createOrder = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const body = req.body;
      const order = await this.pharmacyService.createOrder(
        resp.locals.pharmacyName,
        body
      );
      return resp.json(order);
    } catch (error) {
      return resp
        .status(500)
        .json(CONSTANTS.UNABLE_TO_CREATE_ORDER);
    }
  };

  getOrders = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const ordersList = await this.pharmacyService.getOrders(
        resp.locals.pharmacyName
      );
      return resp.json(ordersList);
    } catch (error) {
      return resp
        .status(500)
        .json(CONSTANTS.UNABLE_TO_FETCH_ORDERS);
    }
  };

  getOrderById = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const id: string = req.params.id;
      const ordersList = await this.pharmacyService.getOrderById(
        resp.locals.pharmacyName,
        id
      );
      return resp.json(ordersList);
    } catch (error) {
      return resp
        .status(500)
        .json(CONSTANTS.UNABLE_TO_FETCH_ORDER_WITH_ID);
    }
  };
}
