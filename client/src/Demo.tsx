import React from 'react'
import Header from './header'
import studibetterimg from './assets/studibetter.png'
import results from './assets/quizResult.png'
import quizStart from './assets/quizStart.png'

const Demo = () => {
  return (
    <>
        <Header />
        <div>
            <h1>Welcome to StudiBetter</h1>
            <h2 className='levels'>Mission:</h2>
            <p className='paragraphs'>StudiBetter is going to become an application for students and learners that target their weakness and improves the users performance. By using a targeted quiz system, users can see their level with each keyword and steadily improve.</p>
            <h2 className='levels'>Levels in StudiBetter</h2>
            <div className='levelsandimage'>
                <div>
                    <div className='boxes'>
                        <p>Level 1: Beginner</p>
                        <div className='status0 box'></div>
                    </div>
                    <div className='boxes'>
                        <p>Level 2: Basic</p>
                        <div className='status1 box'></div>
                    </div>
                    <div className='boxes'>
                        <p>Level 3: Intermediate</p>
                        <div className='status2 box'></div>
                    </div>
                    <div className='boxes'>
                        <p>Level 4: Advance</p>
                        <div className='status3 box'></div>
                    </div>
                    <div className='boxes'>
                        <p>Level 5: Master</p>
                        <div className='status4 box'></div>
                    </div>
                </div>
                <img  className='image' src={studibetterimg}/>
            </div>
            <h2 className='levels'> Quiz</h2>
            <div>
                <p className='paragraphs'>The Quiz feature is your main way to improve the status of your keywords (more methods coming in the future) It will eventually pool from the study set in a specialized way so that the lower the status of the keyword, the more it appears.(Currently, it is just randomly selecting 10 keywords)</p>
                <div>
                    <p>General Quiz</p>
                    <img  className='image' src={quizStart}/>
                </div>
                <div>
                    <p>Results from Quiz</p>
                    <img  className='image' src={results}/>
                </div>

            </div>
        </div>
    </>
  )
}

export default Demo