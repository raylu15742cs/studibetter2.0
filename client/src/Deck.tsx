import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, deleteCard, getDeck } from "./api/cardHandler";
import { TDeck } from "./api/deckHandler";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<string[]>([])
  const [text, setText] = useState("");
  let { deckId } = useParams();
 
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards}= await createCard(deckId!, text);
    //setDecks([...decks, deck])
    setCards(serverCards)
    setText("")
  }

  async function handleDeleteCard( index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index)
    setCards(newDeck.cards);
    //setDecks(decks.filter((deck) => deck._id !==deckId))
  }

  useEffect(() => {
    async function fetchDeck() {
       if(!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards)
    }
    fetchDeck();
  }, [deckId])

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card , index) => (
            <li key={index}>
              <button onClick={() => handleDeleteCard(index)}>X</button>
              {card}
              </li>
        ))
        }
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-title">Card Name</label>
        <input 
          id="card-title"
          value = {text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            // Save what is typed
            {
              setText(e.target.value)
            }
          }
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}