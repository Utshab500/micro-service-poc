import express from 'express';
import dotenv from "dotenv";
import Connection from './db/connection.js';
import userAddRouter from "./routes/user-route.js";
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
app.use("/api", userAddRouter);

// app.get('/health', (req, res) => {
//   res.send('OK!')
// });

// app.post('/add_user', (req, res) => {

//     addUser(req.body).then(resp => res.json({status: resp}));

// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});