import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard } from "./api/cardHandler";

export default function Deck() {
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

//   async function handleDeleteDeck(deckId: string) {
//     await deleteDeck(deckId)
//     setDecks(decks.filter((deck) => deck._id !==deckId))
//   }

//   useEffect(() => {
//     async function fetchDecks() {
//       const newDecks = await getDecks();
//       setDecks(newDecks);
//     }
//     fetchDecks();
//   }, [])

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card) => (
            <li key={card}>
              {/* <button onClick={() => handleDeletecard(card)}>X</button> */}
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