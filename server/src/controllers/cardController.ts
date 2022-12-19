import express , {Request, Response} from "express";
import Topic from "../models/Topic"
import Card from "../models/Card"

export async function createCard(req: Request, res: Response) {
    const newCard = new Card({
        title: req.body.title,
        definition: req.body.definition,
        topic: req.body.topic
    })
    const createdCard = await newCard.save()
    res.json(createdCard)
}

export async function getCards(req: Request, res: Response) {
    const topicId = req.params.deckId
    const topics = await Topic.findById(topicId)
    const cards = await Card.find({topic: topics})
    res.json({cards, topics})
}


export async function deleteCard(req: Request, res: Response){
    const cardId = req.params.cardId
    const card = await Card.findByIdAndDelete(cardId)
    res.json(card)
}

export async function UpdateCard(req: Request, res: Response) {
    const cardId = req.params.cardId
    const card = await Card.findByIdAndUpdate(cardId , {title: req.body.title , definition: req.body.definition})
    res.json(card)
}