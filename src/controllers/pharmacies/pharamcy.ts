import { Request, Response } from "express";
import { PharmacyService } from "../../services/pharmacyService";
import { Pharmacy } from "../../types/pharmacy";
export class PharmacyController {
  private pharmacyService: PharmacyService;
  constructor(pharmacyService: PharmacyService) {
    this.pharmacyService = pharmacyService;
  }
  getPharmacyList = async (req: Request, resp: Response) => {
    const pharmacyList:Pharmacy[] = await this.pharmacyService.getPharmacyList();
    return resp.json(pharmacyList)
  };

  createOrder = async(req: Request, resp: Response) => {
    const body = req.body;
    const pharmacyName:string=resp.locals.pharmacyName
    console.log("request--post--->",req.url)
    console.log("body ---->",body)
    const order = await this.pharmacyService.createOrder(pharmacyName, body);
    return resp.json(order);
  };

  getOrders = async(req: Request, resp: Response) => {
    console.log("request---orders-->",req.url)
    const pharmacyName=req.url.split('/')[1]
    resp.locals.pharmacyName=pharmacyName
    console.log("pharmacyName--------->",pharmacyName)
    const ordersList = await this.pharmacyService.getOrders(pharmacyName);
    return resp.json(ordersList);
  };


  getOrderById = async(req: Request, resp: Response) => {
    console.log("request---id-->",req.url)
    const pharmacyName=req.url.split('/')[1]
    const id=req.params.id
    const ordersList = await this.pharmacyService.getOrderById(pharmacyName,id);
    return resp.json(ordersList);
  };
}
