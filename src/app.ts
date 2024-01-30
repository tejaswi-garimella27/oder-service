import express, { Application } from "express";
import { OrderController } from "./controllers/order";
import { PharmacyController } from "./controllers/pharmacies/pharamcy";
import { PharmacyService } from "./services/pharmacyService";
import { OrderService } from "./services/orderService";
import { ENV_VARIABLE } from "./utils/env";
//  import healthmart from "./routes/healthMart"

const app: Application = express();
const PORT = ENV_VARIABLE.PORT;
const pharmacyService = new PharmacyService(ENV_VARIABLE.PHARMACY_BASE_URL);
const orderService = new OrderService();
const orderController = new OrderController(orderService);
const pharmacyController= new PharmacyController(pharmacyService)

app.use(express.json());

// app.use('/healthmart',healthmart)

app.route('/pharmacy').get(async (req,resp)=> await pharmacyController.getPharmacyList(req,resp))

/**------------------------------HEALTHMART--------------------------------------------- */

app.route('/healthmart/orders').all((req,resp,next)=>{
    const pharmacyName=req.url.split('/')[1]
    resp.locals.pharmacyName=pharmacyName
    next()
})
.post(async (req,resp)=> await pharmacyController.createOrder(req,resp))
.get(async (req,resp)=> await pharmacyController.getOrders(req,resp))

app.route('/healthmart/orders/:id')
.get(async (req,resp)=> await pharmacyController.getOrderById(req,resp))

/**----------------------------------CAREPLUS----------------------------------------- */
app.route('/careplus/orders').all((req,resp,next)=>{
    const pharmacyName=req.url.split('/')[1]
    resp.locals.pharmacyName=pharmacyName
    next()
})
.post(async (req,resp)=> await pharmacyController.createOrder(req,resp))
.get(async (req,resp)=> await pharmacyController.getOrders(req,resp))

app.route('/careplus/orders/:id')
.get(async (req,resp)=> await pharmacyController.getOrderById(req,resp))


/**-------------------------------------QUICKCARE-------------------------------------- */

app.route('/quickcare/orders').all((req,resp,next)=>{
    const pharmacyName=req.url.split('/')[1]
    resp.locals.pharmacyName=pharmacyName
    next()
})
.post(async (req,resp)=> await pharmacyController.createOrder(req,resp))
.get(async (req,resp)=> await pharmacyController.getOrders(req,resp))

app.route('/quickcare/orders/:id')
.get(async (req,resp)=> await pharmacyController.getOrderById(req,resp))

/**--------------------------------------------------------------------------- */

app.listen(PORT, () => {
  console.log(`We are listening on PORT : ${PORT}`);
});

// export default app;