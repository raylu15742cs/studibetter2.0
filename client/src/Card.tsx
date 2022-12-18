import React, { useState, useEffect } from "react";
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
  const [addActive, setAddActive] = useState(false);
  const [updateActive, setUpdateActive] = useState(false);
  const [blurApp, setBlurApp] = useState(true);
  let { deckId } = useParams();
 
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    //setDecks([...decks, deck])
    const card = await createCard(deckId!, title, definition)
    setCards([...cards , card])
    setTitle("")
    setDefinition("")
    setAddActive(false)
    setBlurApp(blurApp => !blurApp)
  }

  async function handleDeleteCard( cardid: string) {
    await deleteCard(deckId!, cardid)
    setCards(cards.filter((card) => card._id !== cardid))
  }

  function checkCard() {
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
    <div>
      <div className={blurApp ? "app" : "blur app"}>
        <Header />
        <h1>{topic}</h1>
        <Link to={'/'}>
          <button className={isEmpty ? '' : 'show'} id="deletebutton" onClick={() => handleDeleteDeck(deckId!)}>Delete Topic</button>
        </Link>
        <div className="decks">
          {cards.map((card: TCard) => (
              <div className="card" key={card._id}>
                <button onClick={() => handleDeleteCard(card._id)}>X</button>
                <p>{card.title}</p>
                <p className="hidedef"> Definition: {card.definition}</p>
                {/* <button className="hidedef" onClick={() => {console.log(card._id)}}> edit </button> */}
              </div>
    
          ))
          }
        </div>
      </div>
      
      <div className="addPopup" onClick={() => {setAddActive(true); setBlurApp(blurApp=>!blurApp)}}>Add Card</div>
      { addActive ? (
        <form  className="cardform" onSubmit={(e:React.FormEvent) => {handleCreateDeck(e)}}>
          <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp=>!blurApp)}}>X</div>
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
        </form>) : ""
      }
    </div>
  )
}
