import express , {Request, Response} from "express";
import Deck from "../models/Deck"


export async function getDecksController(req:Request, res:Response) {
    const decks  = await Deck.find()
    res.json(decks)
}

export async function createDeckController(req: Request, res: Response) {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
}

export async function deleteDeckController(req: Request, res: Response){
    const deckId = req.params.deckId
    const deck = await Deck.findByIdAndDelete(deckId)
    res.json(deck)
}