import express from 'express'
import dbConnection from './databases/dbConnection.js'
import {bootstrap} from './src/modules/index.routes.js'
import  expressListEndpoints from 'express-list-endpoints';
const app = express()
const port = 3000
app.use(express.json());
bootstrap(app);
dbConnection();
app.get("/all-points",(req,res)=>{
    res.send(expressListEndpoints(app))
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))