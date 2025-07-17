import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/dbConnection.js';
import customerRoutes from './routes/customerRoutes.js'
import cors from 'cors'
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Connect Database
connectDb();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello from Express backend on Vercel!");
});


//Set Routes
app.use('/',customerRoutes)


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})