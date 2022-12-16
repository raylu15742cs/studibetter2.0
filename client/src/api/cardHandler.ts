import { API_URL } from "./config";
import { TDeck } from "./deckHandler";

export type TCard = {
  title: string;
  definition: string;
  topic: string[];
  _id : string
}

// Create Decks
export async function createCard(topicId: string , title: string, definition: string): Promise<TCard>{
    const response = await fetch(`${API_URL}/decks/${topicId}/cards`, {
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
export async function getCards(topicId: string): Promise<TCard> {
    const response = await fetch(`${API_URL}/decks/${topicId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            topicId
        })
    });
    return response.json()
}

// Delete Card
export async function deleteCard(deckId: string , index:number): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
      method: "DELETE",
    })
    return response.json()
}