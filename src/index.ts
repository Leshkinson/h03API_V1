import express from "express";
import * as dotenv from 'dotenv';
import bodyParser from "body-parser";
import {router} from "./router/router";
import {serverConfigService} from "./config/config.service";
import mongoose from "mongoose";


dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use('/', router);

const start = async () => {
    try {
        const PORT = serverConfigService.getPort() || 4546;
        await mongoose.connect(serverConfigService.getDbURL());
        mongoose.set('strictQuery', true)
        app.listen(PORT, () => {
            console.log(`Server has been listening on port http://localhost:${PORT}`)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

start()