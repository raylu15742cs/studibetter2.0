import express , {Request, Response} from "express";
import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

import Deck from "./models/Deck"

const PORT = 3001;

const app = express()

app.get("/", (req: Request ,res: Response) => {
    res.send("hello world")
})

app.listen(3000);

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.DB_Password}@cluster0.titas9x.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => {
        console.log(`listing on port ${PORT}`)
        app.listen(PORT)
    })