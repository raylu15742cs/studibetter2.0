import React from 'react'
import Header from './header'

const Demo = () => {
  return (
    <>
        <Header />
        <div>
            <h1>Welcome to StudiBetter</h1>
            <h2>Mission:</h2>
            <p>StudiBetter is going to become an application for students and learners that target their weakness and improves the users performance. By using a targeted quiz system, users can see their level with each keyword and steadily improve.</p>
            <h2>Levels in StudiBetter</h2>
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
    </>
  )
}

export default Demo