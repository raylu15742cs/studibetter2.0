import React, {useState, useEffect ,useCallback} from "react";
import { Link, useParams, redirect, useNavigate} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { getDefinitions, getQuiz, updateScore } from "./api/quizHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./header";

export default function Quiz() {

    let { topicId } = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState<TCard[]>([])
    const [tests, setTests] = useState<TCard[]>([])
    const [def , setDefinitions] = useState<string[]>(["0","1","2","3"])
    const [currentTerm, setCurrentTerm] = useState<TCard>()
    const [count , setCount] = useState(1)
    const [altcount , setAltcount] = useState(0)

    async function currentCard(choice:number) {
      setCount(count+1)
      setAltcount(altcount+1)
      const test = await getDefinitions(topicId!)
      setTests(test.card)
      setCurrentTerm(cards[count])
      checkSelection(choice)
    }

    // will check selection and call
    async function checkSelection(choice:number){
      if(currentTerm!.definition == def[choice]) {
        await updateScore(topicId!, currentTerm!.title , true)
      } else {
        await updateScore(topicId!, currentTerm!.title , false)
      }

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
      if(tests[0] != undefined) {
        if(tests[0].definition != currentTerm!.definition && tests[1].definition != currentTerm!.definition && tests[2].definition != currentTerm!.definition && tests[3].definition != currentTerm!.definition) {
          const index = Math.floor(Math.random() * 3)
          tests[index].definition = currentTerm!.definition
          setDefinitions([tests[0].definition,tests[1].definition,tests[2].definition,tests[3].definition])
        } else {setDefinitions([tests[0].definition,tests[1].definition,tests[2].definition,tests[3].definition])
        }
      }
    }, [tests])
     useEffect(() => {
    if (altcount == 10) {
      navigate(`/topics/${topicId}`);
    }
  }, [count]);
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
            <h2>Count: {count}/10</h2>
            {/* <h2> {currentTerm?.title}: Def {currentTerm?.definition} Count {count}/10</h2> */}
            <button onClick={() => currentCard(0)}>{def[0]}</button>
            <button onClick={() => currentCard(1)}>{def[1]}</button>
            <button onClick={() => currentCard(2)}>{def[2]}</button>
            <button onClick={() => currentCard(3)}>{def[3]}</button>
        </div>
    )
}

