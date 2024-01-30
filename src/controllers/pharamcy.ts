import { Request, Response } from "express";
import { PharmacyService } from "../services/pharmacyService";
import { Pharmacy } from "../types/pharmacy";
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
}
