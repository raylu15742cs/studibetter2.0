import express, {Request, Response} from "express";


export async function getQuiz(req: Request, res: Response) {
    const topicId = req.params.topicId
    console.log(req)
}   

export async function updateScore(req: Request, res: Response) {
    
}
// Function that handles each selection
export async function checkSelection(req: Request, res: Response) {
    
}

export async function storeSelected(req: Request, res: Response) {
    
}