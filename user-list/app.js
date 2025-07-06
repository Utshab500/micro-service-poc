import express from 'express';
import dotenv from "dotenv";
import Connection from './db/connection.js';
import serviceRouter from "./routes/user-route.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';

dotenv.config();

const app = express();
const port = 3000;

const con = new Connection();
con.getClient();

// Parse JSON bodies for this app. 
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api", serviceRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});