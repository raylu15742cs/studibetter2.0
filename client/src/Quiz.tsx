import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { getCards, TCard } from "./api/cardHandler";
import { TTopic } from "./api/topicHandler";
import Header from "./Header";
export default function Quiz() {
  
    return (
        <div>
            <Header />
            <h1> Quiz </h1>
        </div>
    )
}