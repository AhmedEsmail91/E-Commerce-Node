import express from 'express'
import dbConnection from './databases/dbConnection.js'
import {bootstrap} from './src/modules/index.routes.js'
import dotenv from 'dotenv'
import chalk from 'chalk';
dotenv.config();
const app = express()
app.use(express.json());
bootstrap(app);
dbConnection();
app.listen(process.env.PORT, () => console.log(chalk.hex("#eee").italic(`${process.env.APP_NAME} listening on port ${process.env.PORT}!`)))