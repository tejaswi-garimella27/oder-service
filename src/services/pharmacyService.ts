import axios, { AxiosResponse } from "axios";
import { Pharmacy } from "../types/pharmacy";

export class PharmacyService {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getPharmacyList = async (): Promise<Pharmacy[]> => {
    const phamarcyList: AxiosResponse = await axios.get(
      `${this.baseUrl}/pharmacy`
    );
    return phamarcyList.data;
  };
}
