import express , {Request, Response} from "express";
import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

import Deck from "./models/Deck"

const PORT = 3001;

const app = express()
app.use(express.json())

// app.get("/", (req: Request ,res: Response) => {
//     res.send("hello world")
// })

app.post("/decks" , async(req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})

app.listen(3000);

mongoose
    .connect(process.env.MONGO_URL!).then(() => {
        console.log(`listing on port ${PORT}`)
        app.listen(PORT)
    })