import React from 'react'
import Header from './header'
import studibetterimg from './assets/studibetter.png'
import results from './assets/quizResult.png'
import quizStart from './assets/quizStart.png'

const Intro = () => {
  return (
    <>
        <Header />
        <div>
            <h1>Welcome to StudiBetter</h1>
            <h2 className='levels'>Mission:</h2>
            <p className='paragraphs'>StudiBetter is an application for students and learners that target their weakness. By using a targeted quiz system, users get specialized quizs that improve their performance and memorization.</p>
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
                <p className='paragraphs'>The Quiz feature is your main way to improve the status of your keywords (more methods coming in the future) It will eventually pool from the study set in a specialized way so that the lower the status of the keyword, the more it appears. (1 Master, 1 Advanced, 2 Intermediate, 2 Basic, 4 Beginner)</p>
                <div>
                    <h2>Start of Quiz</h2>
                    <img  className='image' src={quizStart}/>
                </div>
                <div>
                    <h2>Results from Quiz</h2>
                    <img  className='image' src={results}/>
                </div>

            </div>
        </div>
    </>
  )
}

export default Intro