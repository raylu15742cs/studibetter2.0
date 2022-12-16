import express , {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as dotenv from 'dotenv'
dotenv.config()

import Deck from "./models/Deck"

const PORT = 5003;

const app = express()
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json())

app.get("/decks", async (req:Request, res:Response) => {
    // Fetch all decks and send back to users
    // 1. How to get deck from mongo?
    const decks  = await Deck.find()
    // 2. Send back array to UI
    res.json(decks)
})

app.post("/decks" , async(req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})

app.delete('/decks/:deckId', async(req: Request, res: Response) => {
    //TODO
    // 1. Get the deck id from the URL
    const deckId = req.params.deckId
    // 2. delete the deck from mongo
    const deck = await Deck.findByIdAndDelete(deckId)
    // 3. return the deleted deck to the user who made the request
    res.json(deck)
})
mongoose
    .connect(process.env.MONGO_URL!).then(() => {
        console.log(`listing on port ${PORT}`)
        app.listen(PORT)
    })