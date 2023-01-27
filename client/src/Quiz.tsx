import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { getDefinitions, getQuiz } from "./api/quizHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./Header";

export default function Quiz() {

    let { topicId } = useParams();
    const [cards, setCards] = useState<TCard[]>([])
    const [tests, setTests] = useState<TCard[]>([])
    const [def , setDefinitions] = useState<String[]>(["0","1","2","3"])
    const [currentTerm, setCurrentTerm] = useState<TCard>()
    const [count , setCount] = useState(1)

    async function currentCard() {
      console.log(count)
      const test = await getDefinitions(topicId!)
      setTests(test.card)
      setCurrentTerm(cards[count])
      setCount(count+1)
    }
    // will check selection and call
    async function checkSelection(){

    }
 
    useEffect(() => {
      async function startQuiz(){
        const card = await getQuiz(topicId!);
        setCards(card.card)
        const test = await getDefinitions(topicId!)
        setTests(test.card)
      }
      startQuiz();
    }, [])
    useEffect(()=>{
      if(cards[0] != undefined) {
        setCurrentTerm(cards[0])
      }
    }, [cards])
    useEffect(()=> {
      console.log(tests)
      if(tests[0] != undefined) {
        if(tests[0].definition != currentTerm!.definition && tests[1].definition != currentTerm!.definition && tests[2].definition != currentTerm!.definition && tests[3].definition != currentTerm!.definition) {
          const index = Math.floor(Math.random() * 3)
          tests[index].definition = currentTerm!.definition
          setDefinitions([tests[0].definition,tests[1].definition,tests[2].definition,tests[3].definition])
        } else {setDefinitions([tests[0].definition,tests[1].definition,tests[2].definition,tests[3].definition])
        }
      }
    }, [tests])
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
            <h2> {currentTerm?.title}: Def {currentTerm?.definition} Count {count}/10</h2>
            <button onClick={currentCard}>{def[0]}</button>
            <button onClick={currentCard}>{def[1]}</button>
            <button onClick={currentCard}>{def[2]}</button>
            <button onClick={currentCard}>{def[3]}</button>
        </div>
    )
}

