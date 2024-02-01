import express, { Request, Response, Router } from "express";
import { ENV_VARIABLE } from "../../utils/env";
import { getPharamcyName } from "../../utils/common";
import { PharmacyController } from "../../controllers/pharamcy";
import { PharmacyService } from "../../services/pharmacyService";

const pharmacyService = new PharmacyService(ENV_VARIABLE.PHARMACY_BASE_URL);
const pharmacyController = new PharmacyController(pharmacyService);

const router: Router = express.Router();

router
  .all("*", (req: Request, resp: Response, next) => {
    getPharamcyName(req, resp);
    next();
  })
  .get(
    "/orders",
    async (req: Request, resp: Response) =>
      await pharmacyController.getOrders(req, resp)
  )
  .post(
    "/orders",
    async (req: Request, resp: Response) =>
      await pharmacyController.createOrder(req, resp)
  )
  .get(
    "/orders/:id",
    async (req: Request, resp: Response) =>
      await pharmacyController.getOrderById(req, resp)
  );

export default router;
