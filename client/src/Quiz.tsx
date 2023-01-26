import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { getQuiz } from "./api/quizHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./Header";

export default function Quiz() {

    let { topicId } = useParams();
    const [cards, setCards] = useState<TCard[]>([])
    const [def , setDefinitions] = useState<String[]>(["0","1","2","3"])

    async function changeScore() {
      setDefinitions(["2","2","2","2"])      
    }
 
    useEffect(() => {
      async function startQuiz(){
        const card = await getQuiz(topicId!);
        setCards(card.card)
      }
      startQuiz();
    }, [])
    useEffect(()=>{
      console.log(cards)
    }, [cards])
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
            <h2>Term</h2>
            <p>{def[0]}</p>
            <p>{def[1]}</p>
            <p>{def[2]}</p>
            <p>{def[3]}</p>
            <button onClick={changeScore}>change</button>
        </div>
    )
}

