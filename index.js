import express from 'express'
const app = express()
const port = 3000
import dbConnection from './databases/dbConnection.js'
dbConnection();
app.use(express.json());
import categoryRoutes from './src/modules/category/category.routes.js'
app.use(categoryRoutes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))