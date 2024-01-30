import express, { Application } from "express";
// import dotenv from "dotenv";

const app: Application = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening at my localhost:${port}`);
});

export default app;
