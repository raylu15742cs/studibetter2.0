import express, {Request, Response} from "express";
import Card from "../models/Card";
import Topic from "../models/Topic";

// Gets a random 10 but not filtered yet
// export async function getQuiz(req: Request, res: Response) {
//     const topicId = req.params.topicId
//     const topics = await Topic.findById(topicId)
//     const card = await Card.aggregate([{
//       $match: { topic: topics!._id }
//    }, { $sample: { size: 10 }}])
//     res.json({card})
// } 

//Build function that gets 10 random but filtered by status
export async function getQuiz(req: Request, res: Response) {
    let count = 10
    let card:any[] = []
    const topicId = req.params.topicId
    const topics = await Topic.findById(topicId)
    const master = await Card.aggregate([{
      $match: {$and: [{ topic: topics!._id }, {status: 4} ]}
   }, { $sample: { size: 1 }}])
    count -= master.length
    card = card.concat(master)
   const advance = await Card.aggregate([{
      $match: {$and: [{ topic: topics!._id }, {status: 3} ]}
   }, { $sample: { size: 1 }}])
   count -= advance.length
   card = card.concat(advance)
   const intermediate = await Card.aggregate([{
      $match: {$and: [{ topic: topics!._id }, {status: 2} ]}
   }, { $sample: { size: 2 }}])
   count -= intermediate.length
   card = card.concat(intermediate)
   const basic = await Card.aggregate([{
      $match: {$and: [{ topic: topics!._id }, {status: 1} ]}
   }, { $sample: { size: 2 }}])
   count -= basic.length
   card = card.concat(basic)
  const beginner = await Card.aggregate([{
      $match: {$and: [{ topic: topics!._id }, {status: 0} ]}
   }, { $sample: { size: 4 }}])
   count -= beginner.length
   card = card.concat(beginner)
   console.log(count)
   const remainder = await Card.aggregate([{
      $match: {$and: [{ topic: topics!._id }]}
   }, { $sample: { size: count }}])
   count -= remainder.length
   card = card.concat(remainder)

    res.json({card})
    
} 

// Generate the definitions for each term
export async function getDefinitions(req: Request, res: Response) {
  const topicId = req.params.topicId
  const topics = await Topic.findById(topicId)
  const card = await Card.aggregate([{
      $match: { topic: topics!._id }
   }, { $sample: { size: 4 }}])
    res.json({card})
}

// Next Version will filter base on status
export async function getQuizF(req: Request, res: Response) {
    
}

export async function updateScore(req: Request, res: Response) {
  const topicId = req.params.topicId
  const term = req.params.currentTerm
  const result = req.params.result
  const currentStatus = await Card.find({topic: topicId , title: term})
  if(currentStatus[0].status != 4 && result =="true") {
    const card = await Card.findOneAndUpdate({topic: topicId , title: term}, {$inc: {status: 1}})
      res.json(card)
  } else if (currentStatus[0].status != 0 && result =="false") {
    const card = await Card.findOneAndUpdate({topic: topicId , title: term}, {$inc: {status: -1}})
      res.json(card)
  } else {
    res.json(currentStatus)
  }
}
// Function that handles each selection
export async function checkSelection(req: Request, res: Response) {
    
}

export async function storeSelected(req: Request, res: Response) {
    
}