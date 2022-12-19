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
  const [blurApp, setBlurApp] = useState(true);
    

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck])
    setTitle("")
    setAddActive(false)
    setBlurApp(blurApp => !blurApp)
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
      <div className={blurApp ? "" : "blur"} >
      <Header />
      <h1> Topics</h1>
      <div className="decks">
        {decks.map((deck) => (
          <div className="card">
            <Link className="decktitle" to={`decks/${deck._id}`}>
              <h1 key={deck._id}>
                {deck.title}
                </h1>
            </Link>
         </div>
        ))
        }
      </div>
      <div className="addPopup" onClick={() => {setAddActive(true); setBlurApp(blurApp => !blurApp)}}>Add Topic</div>
      </div>
      { addActive ? (
        <form className="cardform" onSubmit={handleCreateDeck}>
          <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp => !blurApp)}}>X</div>
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
