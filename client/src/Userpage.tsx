import React from 'react'
import Header from './header'
import { useSelector, useDispatch } from 'react-redux'
import { username, usersub } from './components/user'


const Userpage = () => {
  const sub = useSelector(usersub)
  const name = useSelector(username)
  return (
    <div>
      <Header />
      <h2>Welcome {name}</h2>
      <p>{sub}</p>
    </div>
  )
}

export default Userpage