import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, deleteCard, getCards, TCard, updateCard } from "./api/cardHandler";
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
  const [updateTopic, setUpdateTopic] = useState(false);
  const [currentCard, setCurrentCard] = useState<TCard>();
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

  async function getCard(card: TCard) {
    console.log(card._id)
    setCurrentCard(card)
    setTitle(card.title)
    setDefinition(card.definition)
    setUpdateActive(true)
  }

  async function handleUpdateCard(e: React.FormEvent, id:string) {
    console.log(id)
    e.preventDefault();
    await updateCard(deckId! , id , title, definition)
    setUpdateActive(false)
  }

  useEffect(() => {
    async function fetchCards() {
      if(!deckId) return;
      const newCard = await getCards(deckId);
      setCards(newCard.cards);
      setTopic(newCard.topics.title)
    }
    fetchCards();
  }, [deckId , cards])

  useEffect(()=> {
    checkCard();
  }, [cards])

  return (
    <div>
      <div className={blurApp ? "app" : "blur app"}>
        <Header />
        <div className="topictag">
          <h1>{topic}</h1>
          <button className="edittopic">Edit</button>
        </div>
        <Link onClick={() => handleDeleteDeck(deckId!)} to={'/'}>
          <button className={isEmpty ? '' : 'show'} id="deletebutton" >Delete Topic</button>
        </Link>
        <div className="decks">
          {cards.map((card: TCard) => (
              <div className="card" key={card._id}>
                <button className="hidedelete" onClick={() => handleDeleteCard(card._id)}>X</button>
                <h1>{card.title}</h1>
                <p className="hidedef"> Definition: {card.definition}</p>
                <button className="hideedit" onClick={() => {getCard(card); setBlurApp(blurApp=>!blurApp)}}> edit </button> 
              </div>
    
          ))
          }
        </div>
      </div>
      
      <div className="addPopup" onClick={() => {setAddActive(true); setBlurApp(blurApp=>!blurApp)}}>Add Card</div>
      {/* Add New Card */}
      { addActive ? (
        <form  className="cardform" onSubmit={(e:React.FormEvent) => {handleCreateDeck(e)}}>
          <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp=>!blurApp)}}>X</div>
          <label htmlFor="card-title">Card Name</label>
          <input 
            id="card-title"
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
      {
        updateActive ? (
          <form className="cardform" onSubmit={(e:React.FormEvent) => {handleUpdateCard(e , currentCard!._id)}}>
              <div className="closePopup" onClick={() => {setUpdateActive(false); setBlurApp(blurApp=>!blurApp)}}> x </div>
              <label> Update Card</label>
              <input 
            id="card-title"
            defaultValue = {currentCard!.title}
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
            defaultValue = {currentCard!.definition}
            placeholder = "Definition"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              // Save what is typed
              {
                setDefinition(e.target.value)
              }
            }
          />
          <button>Update Card</button>

          </form>
        ) : ""
      }
    </div>
  )
}
