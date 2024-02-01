import express, { Application, Request, Response } from "express";
import { PharmacyController } from "./controllers/pharamcy";
import { PharmacyService } from "./services/pharmacyService";
import { ENV_VARIABLE } from "./utils/env";
import healthmartRouter from "./routes/pharmacy/healthmart.route";
import careplusRouter from "./routes/pharmacy/careplus.route";
import quickcareRouter from "./routes/pharmacy/quickcare.route";
import internalOrdersRouter from "./routes/orders/orders.route";


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
app.use('/',internalOrdersRouter)

//List pharmacies Route
app.route("/pharmacy").get(async (req: Request, resp: Response) => {
  try {
    await pharmacyController.getPharmacyList(req, resp);
  } catch (error) {
    resp.status(500).json({ error: "Unable to fetch the pharmacy List" });
  }
});

//  Routers to match the different mock pharmacies 
app.use("/healthmart", healthmartRouter);

app.use("/careplus", careplusRouter);

app.use("/quickcare", quickcareRouter);

// Connecting the SERVER 
app.listen(PORT, () => {
  console.log(`I am listening on PORT : ${PORT}`);
});