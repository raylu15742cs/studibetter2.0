import express , {Request, Response} from "express";
import Topic from "../models/Topic"

// Find all topics
export async function getTopics(req:Request, res:Response) {
    const topics  = await Topic.find()
    res.json(topics)
}


export async function createTopic(req: Request, res: Response) {
    const newTopic = new Topic({
        title: req.body.title
    })
    const createdTopic = await newTopic.save()
    res.json(createdTopic)
}

export async function deleteTopic(req: Request, res: Response){
    const topicId = req.params.deckId
    const topic = await Topic.findByIdAndDelete(topicId)
    res.json(topic)
}

export async function updateTopic(req: Request, res: Response) {
    const topic = await Topic.findByIdAndUpdate(req.body._id , {title: req.body.title})
    res.json(topic)
}