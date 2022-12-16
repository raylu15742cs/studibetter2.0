import React, { useState} from "react";
import './App.css'

function App() {
  const [title, setTitle] = useState("");


  return (
    <div className="App">
      <form>
        <label htmlFor="deck-title">Deck Title</label>
        <input 
          id="deck-title"
          value = {title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            // Save what is typed
            {
              setTitle(e.target.value)
            }
          }
        />
      </form>
    </div>
  )
}

export default App
