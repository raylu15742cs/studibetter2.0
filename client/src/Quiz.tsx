import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { getQuiz } from "./api/quizHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./Header";

export default function Quiz() {

    let { topicId } = useParams();

    useEffect(() => {
      const card = getQuiz(topicId!);
    })
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
        </div>
    )
}

