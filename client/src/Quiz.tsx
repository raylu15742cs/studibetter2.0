import React, {useState, useEffect} from "react";
export default function Quiz() {
    const [quizcount, setQuizcount] = useState<number>(0)
    const [score , setScore] = useState<number>(0)

    return (
        <div>
            <Header />
            <h1>Quiz</h1>
        </div>
    )
}