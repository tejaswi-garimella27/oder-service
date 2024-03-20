import express, { Application, Request, Response } from "express";
import { ENV_VARIABLE } from "../../utils/env";
import { PharmacyController } from "../../controllers/pharamcy";
import { PharmacyService } from "../../services/pharmacyService";
import { getPharamcyName } from "../../utils/common";
import { INTEGRATIONS } from "../../ApiConstants";

export const setupRoutes = (app: Application) => {
  INTEGRATIONS.forEach((integration) => {
    const router = express.Router();
    const integrationService = new PharmacyService(
      ENV_VARIABLE.PHARMACY_BASE_URL
    );
    const pharmacyController = new PharmacyController(integrationService);

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
    // Mount the router for this integration
    app.use(`/${integration}`, router);
  });
};
