import express, {Request, Response} from "express";
import Card from "../models/Card";


export async function getQuiz(req: Request, res: Response) {
    const topicId = req.params.topicId
    const card = await Card.findOne({topic: topicId})
    res.json(card)
}   

export async function updateScore(req: Request, res: Response) {
    
}
// Function that handles each selection
export async function checkSelection(req: Request, res: Response) {
    
}

export async function storeSelected(req: Request, res: Response) {
    
}