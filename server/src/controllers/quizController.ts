import express, {Request, Response} from "express";
import Card from "../models/Card";
import Topic from "../models/Topic";

// Gets a random 10 but not filtered yet
export async function getQuiz(req: Request, res: Response) {
    const topicId = req.params.topicId
    const topics = await Topic.findById(topicId)
    const card = await Card.aggregate([{
      $match: { topic: topics!._id }
   }, { $sample: { size: 10 }}])
    res.json({card})
}   

// Next Version will filter base on status
export async function getQuizF(req: Request, res: Response) {
    
}

export async function updateScore(req: Request, res: Response) {
    
}
// Function that handles each selection
export async function checkSelection(req: Request, res: Response) {
    
}

export async function storeSelected(req: Request, res: Response) {
    
}