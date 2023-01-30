import { API_URL } from "./config";
import { TCard } from "./cardHandler";
import { TTopic } from "./topicHandler";

// Get Initial Cards and definitions
export async function getQuiz(topicId:string){
    const response = await fetch(`/topics/${topicId}/quiz`)
    return response.json()
}

export async function getDefinitions(topicId:string){
    const response = await fetch(`/topics/${topicId}/quiz/terms`)
    return response.json()
}

export async function updateScore(topicId: string, currentTerm: string, result: boolean) {
    const response = await fetch(`/topics/${topicId}/quiz/${currentTerm}/${result}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        currentTerm,
        result,
        topic: topicId
      })
    });
    return response.json()
}