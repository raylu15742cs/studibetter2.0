import { API_URL } from "./config";
import { TTopic } from "./topicHandler";

export type TCard = {
  title: string;
  definition: string;
  topic: string[];
  _id : string;
  status: number;
}

// Create Card
export async function createCard(topicId: string , title: string, definition: string): Promise<TCard>{
    const response = await fetch(`/topics/${topicId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,
        definition,
        topic: topicId
      })
    });
    return response.json()
}
// Get Cards from specific topic
export async function getCards(topicId: string){
    const response = await fetch(`/topics/${topicId}`)
    return response.json()
}


// Delete Card
export async function deleteCard(topicId: string ,cardId: string): Promise<TTopic> {
    const response = await fetch(`/topics/${topicId}/cards/${cardId}`, {
      method: "DELETE",
    })
    return response.json()
}

// Update Card

export async function updateCard( topicId: string, cardId: string, title: string, definition:string) {
    const response = await fetch(`/topics/${topicId}/cards/${cardId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        _id: cardId,
        title,
        definition,
      })
    });
    return response.json();
}