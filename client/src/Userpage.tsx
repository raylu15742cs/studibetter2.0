import React, { useEffect, useState } from 'react'
import Header from './header'
import { useSelector, useDispatch } from 'react-redux'
import { username, usersub } from './components/user'
import { Link } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { TTopic, createTopic, getTopics } from './api/topicHandler'


const Userpage = () => {
  const sub = useSelector(usersub)
  const name = useSelector(username)
  const [topics, setTopics] = useState<TTopic[]>([])
  const [title, setTitle] = useState("");
  const [addActive, setAddActive] = useState(false);
  const [blurApp, setBlurApp] = useState(true);
    

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    const topic = await createTopic(title, sub);
    setTopics([...topics, topic])
    setTitle("")
    setAddActive(false)
    setBlurApp(blurApp => !blurApp)
  }


  useEffect(() => {
    async function fetchTopics() {
      const newTopics = await getTopics(sub);
      setTopics(newTopics);
    }
    fetchTopics();
  }, [topics])


  return (
    <div className="App">
      <div className={blurApp ? "" : "blur"} >
      <Header />
      <h1> {name}'s Topic</h1>
      {topics.length ? (
        <div className="topics">
        {topics.map((topic) => (
          <Link className="topictitle" to={`/${sub}/topics/${topic._id}`}>
            <div className="card" key={topic._id}>
                <h2>
                  {topic.title}
                </h2>
            </div>
          </Link>
        ))
        }
      </div>
      ) : <div>
        <h3>Add Your First Topic</h3>
        </div>
      }
    
      <div className="addPopup" onClick={() => {setAddActive(true); setBlurApp(blurApp => !blurApp)}}>Add Topic</div>
      </div>

      { addActive ? (
        <div>
          {topics.length < 3 ? (
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

          ) : <div className="cardform">
            <div className="closePopup" onClick={() => {setAddActive(false); setBlurApp(blurApp => !blurApp)}}>X</div>
            <h2>Max Topics Reached</h2> 
            </div>}
        </div>
      ): ""}
    </div>
  )
}

export default Userpage