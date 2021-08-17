import express from 'express'
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import productRoute from './routes/product.route'
import { startApplication } from './config';

dotenv.config();

const app = express()

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/products', productRoute);
app.get('/', (req, res) => {
    res.json({
        message: 'test'
    })
})


startApplication(app);

