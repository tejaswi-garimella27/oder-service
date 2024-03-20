import express, { Application, Request, Response } from "express";
import { PharmacyController } from "./controllers/pharamcy";
import { PharmacyService } from "./services/pharmacyService";
import { ENV_VARIABLE } from "./utils/env";
import internalOrdersRouter from "./routes/orders/orders.route";
import { setupRoutes } from "./routes/pharmacy/integration.route";
import { CONSTANTS } from "./ApiConstants";

const app: Application = express();
const PORT: number = ENV_VARIABLE.PORT;

// Initialize the Pharmacy Service class along with the Mock URL from env
const pharmacyService: PharmacyService = new PharmacyService(
  ENV_VARIABLE.PHARMACY_BASE_URL
);
const pharmacyController: PharmacyController = new PharmacyController(
  pharmacyService
);

app.use(express.json());

//Roter to match the order service
app.use("/", internalOrdersRouter);

setupRoutes(app);

//List pharmacies Route
app
  .route(`${CONSTANTS.PHARMACY_LIST_URL}`)
  .get(async (req: Request, resp: Response) => {
    try {
      await pharmacyController.getPharmacyList(req, resp);
    } catch (error) {
      resp.status(500).json({ error: "Unable to fetch the pharmacy List" });
    }
  });

// Connecting the SERVER
app.listen(PORT, () => {
  console.log(`I am listening on PORT : ${PORT}`);
});
