import express, {Request, Response} from "express";
import Card from "../models/Card";
import Topic from "../models/Topic";

// convert to general quiz
// set max size
export async function getQuiz(req: Request, res: Response) {
    const topicId = req.params.topicId
    const topics = await Topic.findById(topicId)
    const card = await Card.aggregate([{
      $match: { topic: topics }
   },{$sample: {size: 5}}])
    console.log(card)
    res.json({card})
}   

export async function updateScore(req: Request, res: Response) {
    
}
// Function that handles each selection
export async function checkSelection(req: Request, res: Response) {
    
}

export async function storeSelected(req: Request, res: Response) {
    
}