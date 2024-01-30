import express, { Application, Request, Response } from "express";
import { OrderController } from "../controllers/order";
import { PharmacyController } from "../controllers/pharmacies/pharamcy";
import { PharmacyService } from "../services/pharmacyService";
import { OrderService } from "../services/orderService";
import { ENV_VARIABLE } from "../utils/env";
// import app from '../app'
// const app: Application = express();
// const PORT = ENV_VARIABLE.PORT;

const pharmacyService = new PharmacyService(ENV_VARIABLE.PHARMACY_BASE_URL);
const orderService = new OrderService();
const orderController = new OrderController(orderService);
const pharmacyController = new PharmacyController(pharmacyService);

// const router = express.Router();
// router.all("/healthmart", (req: Request, resp: Response, next) => {
//   console.log("INTIAL CALL --------->");
//   const pharmacyName = req.url.split("/")[1];
//   resp.locals.pharmacyName = pharmacyName;
//   console.log("pharmacyName--------->", pharmacyName);
//   next();
// });

// router.get(
//   "/orders",
//   async (req: Request, resp: Response) =>
//     await pharmacyController.getOrders(req, resp)
// );
// router.post(
//   "/orders",
//   async (req: Request, resp: Response) =>
//     await pharmacyController.createOrder(req, resp)
// );
// router.get(
//   "/orders/:id",
//   async (req: Request, resp: Response) =>
//     await pharmacyController.getOrderById(req, resp)
// );

// export default router;
