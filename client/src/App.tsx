import React, { useEffect, useState} from "react";
import './App.css'
import { Link } from "react-router-dom";
import { TTopic, createTopic, getTopics } from "./api/topicHandler";
import Header from "./header";
import { deleteCard } from "./api/cardHandler";



function App() {
  const [topics, setTopics] = useState<TTopic[]>([])
  const [title, setTitle] = useState("");
  const [addActive, setAddActive] = useState(false);
  const [blurApp, setBlurApp] = useState(true);
    

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    const topic = await createTopic(title);
    setTopics([...topics, topic])
    setTitle("")
    setAddActive(false)
    setBlurApp(blurApp => !blurApp)
  }


  useEffect(() => {
    async function fetchTopics() {
      const newTopics = await getTopics();
      setTopics(newTopics);
    }
    fetchTopics();
  }, [])

  return (
    <div className="App">
      <div className={blurApp ? "" : "blur"} >
      <Header />
      <h1> Topics</h1>
      <div className="topics">
        {topics.map((topic) => (
          <div className="card">
            <Link className="topictitle" to={`topics/${topic._id}`}>
              <h1 key={topic._id}>
                {topic.title}
                </h1>
            </Link>
         </div>
        ))
        }
      </div>
      <div className="addPopup" onClick={() => {setAddActive(true); setBlurApp(blurApp => !blurApp)}}>Add Topic</div>
      </div>
      { addActive ? (
        <form className="cardform" onSubmit={handleCreateTopic}>
          <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp => !blurApp)}}>X</div>
          <label htmlFor="topic-title">Topic Title</label>
          <input 
            id="topic-title"
            placeholder="Topic"
            value = {title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              // Save what is typed
              {
                setTitle(e.target.value)
              }
            }
          />
          <button>Create Topic</button>
      </form>
      ) : ""
      }
    </div>
  )
}

export default App
