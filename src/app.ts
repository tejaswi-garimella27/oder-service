import express, { Application, Request, Response } from "express";
import { PharmacyController } from "./controllers/pharamcy";
import { PharmacyService } from "./services/pharmacyService";
import { ENV_VARIABLE } from "./utils/env";
import healthmartRouter from "./routes/healthmart";
import careplusRouter from "./routes/careplus";
import quickcareRouter from "./routes/quickcare";

const app: Application = express();
const PORT: number = ENV_VARIABLE.PORT;
const pharmacyService: PharmacyService = new PharmacyService(
  ENV_VARIABLE.PHARMACY_BASE_URL
);
const pharmacyController: PharmacyController = new PharmacyController(
  pharmacyService
);

app.use(express.json());

app
  .route("/pharmacy")
  .get(
    async (req: Request, resp: Response) =>
      await pharmacyController.getPharmacyList(req, resp)
  );

app.use("/healthmart", healthmartRouter);

app.use("/careplus", careplusRouter);

app.use("/quickcare", quickcareRouter);

app.listen(PORT, () => {
  console.log(`We are listening on PORT : ${PORT}`);
});
