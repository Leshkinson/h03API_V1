import express from "express";
import * as dotenv from 'dotenv';
import bodyParser from "body-parser";
import {router} from "./router/router";
import {serverConfigService} from "./config/config.service";

dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use('/', router);

const start = () => {
    try {
        const PORT = serverConfigService.getPort() || 4546
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