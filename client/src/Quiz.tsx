import React, {useState, useEffect ,useCallback} from "react";
import { Link, useParams, redirect, useNavigate} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { getDefinitions, getQuiz, updateScore } from "./api/quizHandler";
import Header from "./header";
import PulseLoader from 'react-spinners/PulseLoader'

export default function Quiz() {

    let { topicId } = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState<TCard[]>([])
    const [tests, setTests] = useState<TCard[]>([])
    const [def , setDefinitions] = useState<string[]>([])
    const [currentTerm, setCurrentTerm] = useState<TCard>()
    const [count , setCount] = useState(1)
    const [altcount , setAltcount] = useState(0)
    const [results, setResult] = useState<string[]>([])
    const [quizcomplete, setQuizComplete] = useState(false);
    const [blurApp, setBlurApp] = useState(true);

    async function currentCard(choice:number) {
      setCount(count+1)
      setAltcount(altcount+1)
      const test = await getDefinitions(topicId!)
      setTests(test.card)
      setCurrentTerm(cards[count])
      checkSelection(choice)
    }

    async function backToTopic() {
      navigate(`/topics/${topicId}`)
    }

    // will check selection and call
    async function checkSelection(choice:number){
      if(currentTerm!.definition == def[choice]) {
        await updateScore(topicId!, currentTerm!.title , true)
        setResult(results => [...results , `${count}: ${currentTerm!.title}, Correct |`])
      } else {
        await updateScore(topicId!, currentTerm!.title , false)
        setResult(results => [...results , `${count}: ${currentTerm!.title}, Incorrect |`])
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
      if(tests[0] != undefined && altcount != 10) {
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
      setQuizComplete(true)
      setBlurApp(false)
      console.log(results)
    }
  }, [count]);
    return (
        <div>
          <Header />
          { def.length > 1 ? (
            <div className={blurApp ? '' : 'blur'}>
              <h1> Quiz </h1>
              <h2>Current Term: {currentTerm?.title} </h2>
              <h3>Count: {count}/10</h3>
              {/* <h2> {currentTerm?.title}: Def {currentTerm?.definition} Count {count}/10</h2> */}
              <button className="quizbutton" onClick={() => currentCard(0)}>{def[0]}</button>
              <button className="quizbutton" onClick={() => currentCard(1)}>{def[1]}</button>
              <button className="quizbutton" onClick={() => currentCard(2)}>{def[2]}</button>
              <button className="quizbutton" onClick={() => currentCard(3)}>{def[3]}</button>
          </div>
          ) : <PulseLoader color={"#FFF"} />

          }
          { quizcomplete ? (
                <form className="cardform resultform" onSubmit={backToTopic} >
                  {results.map((result) => (
                    <h3>{result}</h3>
                  ))
                  }
                  <button> Back to Home </button>
                </form>
              ) : ''
              } 
        </div> 
    )
}

