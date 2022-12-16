import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, deleteCard, getCards, TCard } from "./api/cardHandler";
import { TDeck } from "./api/deckHandler";
import './App.css'

export default function Deck() {
  const [decks, setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState()
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");
  let { deckId } = useParams();
 
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    //setDecks([...decks, deck])
    const {title: serverCards} = await createCard(deckId!, title, definition)
    //setCards(serverCards)
    setTitle("")
    setDefinition("")
  }

  // async function handleDeleteCard( index: number) {
  //   if (!deckId) return;
  //   const newDeck = await deleteCard(deckId, index)
  //   setCards(newDeck.cards);
  //   //setDecks(decks.filter((deck) => deck._id !==deckId))
  // }

  useEffect(() => {
    async function fetchCards() {
       if(!deckId) return;
      const newDeck = await getCards(deckId);
      //setDeck(newDeck);
    }
    fetchCards();
  }, [deckId])

  return (
    <div className="App">
      <h1>{deckId}</h1>
      {/* <ul className="decks">
        {cards.map((card , index) => (
            <li key={index}>
              {/* <button onClick={() => handleDeleteCard(index)}>X</button> */}
              {/* {card}
              </li>
        ))
        }
      </ul> */}
      <form  className="cardform" onSubmit={handleCreateDeck}>
        <label htmlFor="card-title">Card Name</label>
        <input 
          id="card-title"
          value = {title}
          placeholder = "Keyword"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            // Save what is typed
            {
              setTitle(e.target.value)
            }
          }
        />
        <input 
          id="card-title"
          value = {definition}
          placeholder = "Definition"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            // Save what is typed
            {
              setDefinition(e.target.value)
            }
          }
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}