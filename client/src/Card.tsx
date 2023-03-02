import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, deleteCard, getCards, TCard, updateCard } from "./api/cardHandler";
import { deleteTopic, TTopic, updateTopic } from "./api/topicHandler";
import './App.css'
import Header from "./header";
import PulseLoader from 'react-spinners/PulseLoader'
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const [isEmpty, setIsEmpty] = useState<Boolean>(true)
  const [topic, setTopic] = useState<TTopic>()
  const [topicTitle, setTopicTitle] = useState("")
  const [cards, setCards] = useState<TCard[]>([])
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");
  const [addActive, setAddActive] = useState(false);
  const [updateActive, setUpdateActive] = useState(false);
  const [updateTopicActive, setUpdateTopic] = useState(false);
  const [currentCard, setCurrentCard] = useState<TCard>();
  const [blurApp, setBlurApp] = useState(true);
  const [quizShow, setQuizShow] = useState(false)
  let { topicId, username } = useParams();

  const navigate = useNavigate()
 
  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const card = await createCard(topicId!, title, definition)
    setCards([...cards , card])
    setTitle("")
    setDefinition("")
    setAddActive(false)
    setBlurApp(blurApp => !blurApp)
  }

  async function handleDeleteCard( cardid: string) {
    await deleteCard(topicId!, cardid)
    setCards(cards.filter((card) => card._id !== cardid))
  }

  function checkCard() {
    if (cards.length == 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }
  async function handleDeleteTopic(topicId: string) {
    await deleteTopic(topicId)
    navigate(`/${username}`)
    
  }

  async function getCard(card: TCard) {
    setCurrentCard(card)
    setTitle(card.title)
    setDefinition(card.definition)
    setUpdateActive(true)
  }

  async function handleUpdateTopic(e: React.FormEvent) {
    e.preventDefault();
    setUpdateTopic(true)
  }

  async function submitUpdateTopic(e: React.FormEvent) {
    e.preventDefault()
    setTopicTitle(topicTitle)
    setUpdateTopic(false) ; 
    setBlurApp(blurApp=>!blurApp)
    await updateTopic(topic!._id, topicTitle)

  }

  async function handleUpdateCard(e: React.FormEvent , id: string) {
    e.preventDefault();
    await updateCard(topicId! , id , title, definition)
    setUpdateActive(false)
  }

  useEffect(() => {
    async function fetchCards() {
      if(!topicId) return;
      const newCard = await getCards(topicId);
      setCards(newCard.cards);
      setTopic(newCard.topics);
    }
    if(cards.length >= 10 ) {
      setQuizShow(true)
    } else {
      setQuizShow(false)
    }
    fetchCards();
  }, [topicId , cards])

  useEffect(()=> {
    checkCard();
  }, [cards])

  return (
    <div>
      <div className={blurApp ? "app" : "blur app"}>
        <Header />
        { topic?.title ? (
          <div>
              <div className="topictag">
                <h1>{topic?.title}</h1>
                <button className="edittopic" onClick={(e: React.FormEvent) => {handleUpdateTopic(e); setBlurApp(blurApp=>!blurApp)}}>Edit</button>
              </div>
                <button className={isEmpty ? '' : 'show'} id="deletebutton" onClick={() => handleDeleteTopic(topicId!)} >Delete Topic</button>
              <Link to={`/${username}/topics/${topicId}/quiz`}><h2 className={quizShow ? "" : "show"}>Quiz</h2></Link>
              <div className="cards">
                {cards.map((card: TCard) => (
                <div className={`card status${card.status}`} key={card._id}>
                  <button className="hidedelete" onClick={() => handleDeleteCard(card._id)}>X</button>
                  <h1>{card.title}</h1>
                  <p className="hidedef"> Definition: {card.definition}</p>
                  <button className="hideedit" onClick={() => {getCard(card); setBlurApp(blurApp=>!blurApp)}}> edit </button> 
              </div>
              ))
              }
            </div>
            <div className="addPopup" onClick={() => {setAddActive(true); setBlurApp(blurApp=>!blurApp)}}>Add Card</div>
            <div>
                <div className='boxes'>
                    <p>Level 1: Beginner</p>
                    <div className='status0 box'></div>
                </div>
                <div className='boxes'>
                    <p>Level 2: Basic</p>
                    <div className='status1 box'></div>
                </div>
                <div className='boxes'>
                    <p>Level 3: Intermediate</p>
                    <div className='status2 box'></div>
                </div>
                <div className='boxes'>
                    <p>Level 4: Advance</p>
                    <div className='status3 box'></div>
                </div>
                <div className='boxes'>
                    <p>Level 5: Master</p>
                    <div className='status4 box'></div>
                </div>
            </div>
          </div>
        ): <PulseLoader color={"#FFF"} />}

      </div>
      
      {/* Add New Card */}
      { addActive ? (
        <form onSubmit={(e:React.FormEvent) => {handleCreateCard(e)}}>
          <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp=>!blurApp)}}>X</div>
          { cards.length < 15 ? ( <div className="cardform">
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
            className="definition"
            placeholder = "Definition"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              // Save what is typed
              {
                setDefinition(e.target.value)
              }
            }
          />
          <button>Create Card</button>
          </div>) :
            <div className="cardform">
              <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp=>!blurApp)}}>X</div>
              <h2>Max Card Reached</h2>
            </div>

          }
        </form>) : ""
      }
      {/* Update Card */}
      {
        updateActive ? (
          <form className="cardform" onSubmit={(e:React.FormEvent) => {handleUpdateCard(e , currentCard!._id); setBlurApp(blurApp =>! blurApp)}}>
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
            className="definition" 
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
        {/* Update Topic */}
        {
          updateTopicActive ? (
            <form  className="cardform" onSubmit={(e:React.FormEvent) => {submitUpdateTopic(e)}}>
              <div className="closePopup" onClick={() => {setUpdateTopic(false); setBlurApp(blurApp=>!blurApp)}}> x </div>
            <label> Update Topic</label>
            <input 
              id="topic-title"
              defaultValue = {topic!.title}
              placeholder = "Keyword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                // Save what is typed
                {
                  setTopicTitle(e.target.value)
                }
              }
            />
              <button>Update Topic</button>
            </form>
          ) : ""
        }
    </div>
  )
}
