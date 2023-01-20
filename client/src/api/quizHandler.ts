import { API_URL } from "./config";
import { TCard } from "./cardHandler";
import { TTopic } from "./topicHandler";

// Get Initial Cards and definitions
export async function getQuiz(topicId:string){
    const response = await fetch(`${API_URL}/topics/${topicId}/quiz`)
    console.log(response)
    return response.json()
}