import React, { useEffect, useState} from "react";
import './App.css'

type TDeck = {
  title: string;
  _id : string
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:5003/decks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,
      })
    })
    setTitle("")
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5003/decks");
      const newDecks = await response.json()
      setDecks(newDecks);
      console.log(newDecks)
    }
    fetchDecks();
  }, [])

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
            <li key={deck._id}>{deck.title}</li>
        ))
        }
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input 
          id="deck-title"
          value = {title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            // Save what is typed
            {
              setTitle(e.target.value)
            }
          }
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
