import React, { useEffect, useState} from "react";
import './App.css'
import { Link } from "react-router-dom";
import { TDeck, createDeck, getDecks } from "./api/deckHandler";
import Header from "./header";
import { deleteCard } from "./api/cardHandler";



function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState("");
    const [addActive, setAddActive] = useState(false);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck])
    setTitle("")
    setAddActive(false)
  }


  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, [])

  return (
    <div className="App">
      <Header />
      <h1> Topics</h1>
      <ul className="decks">
        {decks.map((deck) => (
          <Link className="decktitle" to={`decks/${deck._id}`}>
            <li key={deck._id}>
              {deck.title}
              </li>
          </Link>
        ))
        }
      </ul>
      <div className="addPopup" onClick={() => setAddActive(true)}>Add Topic</div>
      { addActive ? (
        <form className="cardform" onSubmit={handleCreateDeck}>
          <div className="closePopup" onClick={() => setAddActive(false)}>X</div>
          <label htmlFor="deck-title">Deck Title</label>
          <input 
            id="deck-title"
            placeholder="Topic"
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
      ) : ""
      }
    </div>
  )
}

export default App
