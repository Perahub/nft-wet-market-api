import express from 'express'
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import productRoute from './routes/product.route'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/products', productRoute);
app.get('/', (req, res) => {
    res.json({
        message: 'test'
    })
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});