import { API_URL } from "./config";
import { TDeck } from "./deckHandler";


// Create Decks
export async function createCard(deckId: string , text: string): Promise<TDeck>{
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        text,
      })
    });
    return response.json()
}
// Get Deck Cards
export async function getDeck(deckId: string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json()
}

// Delete Card
export async function deleteCard(deckId: string , index:number): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
      method: "DELETE",
    })
    return response.json()
}