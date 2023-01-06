import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import Header from "./Header";
export default function Quiz() {
    const [quizcount, setQuizcount] = useState<number>(0)
    const [score , setScore] = useState<number>(0)
    let { topicId } = useParams();

    return (
        <div>
            <Header />
            <h1>{topicId}</h1>
            <h3>{quizcount} {score}</h3>
        </div>
    )
}