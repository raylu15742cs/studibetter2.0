import { API_URL } from "./config";

export type TDeck = {
  title: string;
  _id : string
}
// Create Decks
export async function createDeck(title: string) {
    const response = await fetch(`${API_URL}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,
      })
    });
    return response.json()
}

// Get Decks
export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch(`${API_URL}/decks`);
    return response.json()
}

// Delete Decks
export async function deleteTopic(deckId: string){

    await fetch(`${API_URL}/decks/${deckId}`, {
      method: "DELETE",
    })
}

// Update Decks
export async function updateTopic(deckId: string , title: string) {
  const response = await fetch(`${API_URL}/decks/${deckId}` , {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
      },
    body:JSON.stringify({
        _id: deckId,
        title,
      })
  })
  return response.json()
}