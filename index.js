import express from 'express'
import dbConnection from './databases/dbConnection.js'
import {bootstrap} from './src/modules/index.routes.js'
import dotenv from 'dotenv'
import chalk from 'chalk';
import cors from 'cors'
import Orders from './src/modules/order/order.controller.js'
const port=3000
dotenv.config();
const app = express()
app.use(cors(
    {
        // origin: process.env.CLIENT_URL,
        origin: "*",
        credentials: true,
        allowedHeaders: ['Content-Type','Authorization'],
        methods: ['GET','POST','PUT','DELETE']
    }
))
app.post('/webhook', express.raw({type: 'application/json'}),Orders.createOnlineOrder);
app.use(express.json());
bootstrap(app);
dbConnection();
app.listen(process.env.PORT||port, () => console.log(chalk.hex("#eee").italic(`${process.env.APP_NAME} listening on port ${process.env.PORT}!`)))