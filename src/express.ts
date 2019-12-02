
import * as express from "express";
import * as bodyParser from "body-parser";
import {createConnection} from "typeorm";

const createApp = async () => {
    try {
        await createConnection()
    } catch (error) {
        // console.warn(error)
    }
    const app = express();
    app.use(bodyParser.json());
    return app
}

export {
    createApp
}
