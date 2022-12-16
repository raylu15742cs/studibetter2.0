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
    const topicId = req.body.topicId
    const topics = await Topic.findById(topicId)
    const cards = await Card.find({topic: topics})
    console.log(cards)
    res.json(cards)
}