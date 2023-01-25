import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { getQuiz } from "./api/quizHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./Header";

export default function Quiz() {

    let { topicId } = useParams();
    const [cards, setCards] = useState<TCard[]>([])

    useEffect(() => {
      async function startQuiz(){
        const card = await getQuiz(topicId!);
        setCards(card.card)
        console.log(cards)
      }
      startQuiz();
    }, [])
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
            <div className="cards">
              {cards.map((card: TCard) => (
              <div className={`card status${card.status}`} key={card._id}>
                <h1>{card.title}</h1>
                <p className="hidedef"> Definition: {card.definition}</p>
              </div>
                ))
              }
              
            </div>
        </div>
    )
}

