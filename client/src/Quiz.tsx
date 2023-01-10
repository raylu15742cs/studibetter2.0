import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./Header";
export default function Quiz() {
    const [quizcount, setQuizcount] = useState<number>(0)
    const [score , setScore] = useState<number>(0)
    const [cards, setCards] = useState<TCard[]>([])
    const [topic, setTopic] = useState<TTopic>()
    let { topicId } = useParams();

    useEffect(() => {
    async function fetchCards() {
      if(!topicId) return;
      const newCard = await getCards(topicId);
      setCards(newCard.cards);
      setTopic(newCard.topics);
    }
    fetchCards();
  }, [topicId , cards])

    return (
        <div>
            <Header />
            <h1>{topic?.title}</h1>
            <h3>Question #{quizcount}</h3>
            <h3>Score #{score}</h3>
            <p> How to build you?</p>
            <h3>You are my bane</h3>

        </div>
    )
}