import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, deleteCard, getCards, TCard } from "./api/cardHandler";
import { deleteTopic } from "./api/deckHandler";
import './App.css'
import Header from "./header";

export default function Deck() {
  const [isEmpty, setIsEmpty] = useState<Boolean>(true)
  const [topic, setTopic] = useState("")
  const [cards, setCards] = useState<TCard[]>([])
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");
  let { deckId } = useParams();
 
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    //setDecks([...decks, deck])
    const card = await createCard(deckId!, title, definition)
    setCards([...cards , card])
    setTitle("")
    setDefinition("")
  }

  async function handleDeleteCard( cardid: string) {
    await deleteCard(deckId!, cardid)
    setCards(cards.filter((card) => card._id !== cardid))
  }

  function checkCard() {
    console.log(cards.length)
    if (cards.length == 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }
  async function handleDeleteDeck(deckId: string) {
    await deleteTopic(deckId)

  }

  useEffect(() => {
    async function fetchCards() {
      if(!deckId) return;
      const newCard = await getCards(deckId);
      setCards(newCard.cards);
      setTopic(newCard.topics.title)
    }
    fetchCards();
  }, [deckId])

  useEffect(()=> {
    checkCard();
  }, [cards])

  return (
    <div className="App">
      <Header />
      <h1>{topic}</h1>
      <Link to={'/'}>
        <button className={isEmpty ? '' : 'show'} id="deletebutton" onClick={() => handleDeleteDeck(deckId!)}>Delete Topic</button>
      </Link>
      <ul className="decks">
        {cards.map((card: TCard) => (
            <li key={card._id}>
              <button onClick={() => handleDeleteCard(card._id)}>X</button>
              {card.title}
              </li>
        ))
        }
      </ul>
      
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
