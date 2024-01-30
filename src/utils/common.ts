import { Request, Response } from "express";

export const getPharamcyName = (req: Request, resp: Response): Response => {
  const pharmacyName: string = req.originalUrl.split("/")[1];
  resp.locals.pharmacyName = pharmacyName;
  return resp;
};
