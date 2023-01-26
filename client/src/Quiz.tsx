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
    const [currentTerm, setCurrentTerm] = useState('')
    const [count , setCount] = useState(1)

    async function currentCard() {
      if(def[0] == "0") {
         setDefinitions([cards[0].definition,cards[1].definition,cards[2].definition,cards[3].definition])
      } else {
        setDefinitions(["0","1","2","3"])      
      }
      console.log(count)
      setCurrentTerm(cards[count].title)
      setCount(count+1)   
    }
    // will check selection and call
    async function checkSelection(){

    }
 
    useEffect(() => {
      async function startQuiz(){
        const card = await getQuiz(topicId!);
        setCards(card.card)
      }
      startQuiz();
    }, [])
    useEffect(()=>{
      if(cards[0] != undefined) {
        setCurrentTerm(cards[0].title)
      }
    }, [cards])
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
            <h2>Current Term: {currentTerm}</h2>
            <button onClick={currentCard}>{def[0]}</button>
            <button onClick={currentCard}>{def[1]}</button>
            <button onClick={currentCard}>{def[2]}</button>
            <button onClick={currentCard}>{def[3]}</button>
        </div>
    )
}

