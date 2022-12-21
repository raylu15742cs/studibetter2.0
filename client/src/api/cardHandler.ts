import { API_URL } from "./config";
import { TDeck } from "./topicHandler";

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
export async function getCards(deckId: string){
    const response = await fetch(`${API_URL}/decks/${deckId}`)
    return response.json()
}


// Delete Card
export async function deleteCard(deckId: string ,cardId: string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
      method: "DELETE",
    })
    return response.json()
}

// Update Card

export async function updateCard( deckId: string, cardId: string, title: string, definition:string) {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
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