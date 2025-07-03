import express from 'express';
import dotenv from "dotenv";
import Connection from './db/connection.js';
import { addUser } from './services/user.js';

dotenv.config();

const app = express();
const port = 3000;

const con = new Connection();
con.getClient();

// const UserService = require('./services/UserService')
// const TaskService = require('./services/TaskService')

// Parse JSON bodies for this app. 
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK!')
})

app.post('/add_user', (req, res) => {

    addUser(req.body).then(resp => res.json({status: resp}));

})