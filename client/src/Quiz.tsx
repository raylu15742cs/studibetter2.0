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
    const [status, setStatus] = useState("")
    async function checkLength() {
      if (cards.length > 10) {
        setStatus("Big")
      } else {
        setStatus("Small")
      }
    }

    useEffect(() => {
    async function fetchCards() {
      if(!topicId) return;
      const newCard = await getCards(topicId);
      setCards(newCard.cards);
      setTopic(newCard.topics);
    }
    fetchCards();
    checkLength();
  }, [topicId , cards])

    return (
        <div>
            <Header />
            <h1> Quiz </h1>
        </div>
    )
}