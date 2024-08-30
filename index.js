import express from 'express'
import dbConnection from './databases/dbConnection.js'
import {bootstrap} from './src/modules/index.routes.js'
import dotenv from 'dotenv'
dotenv.config();
const app = express()
app.use(express.json());
bootstrap(app);
dbConnection();
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))