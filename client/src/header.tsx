import { Link } from "react-router-dom"
import { API_URL } from "./api/config"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import { useSelector, useDispatch } from 'react-redux'
import { newuser,resetuser, newsub, username, usersub} from './components/user'
import { useNavigate } from "react-router-dom"

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const name = useSelector(username)
    const sub = useSelector(usersub)


    function handleSignOut(event:any) {
        dispatch(resetuser())
        document.getElementById('signInDiv')!.hidden = false;
        navigate('/')
    }

    async function handleCallbackResponse(response: any) {
        var userObject:any = jwtDecode(response.credential)
        dispatch(newuser(userObject.name))
        dispatch(newsub(userObject.sub))
        document.getElementById('signInDiv')!.hidden = true;
        navigate(`/${username}`)
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '141557847771-abp13s9u5nubb1safoqorsom646s0ka0.apps.googleusercontent.com',
            callback: handleCallbackResponse
        }),
        google.accounts.id.renderButton(
            document.getElementById('signInDiv') as HTMLElement,
            {
                theme: "outline", size: "large",
                type: "standard"
            }
        )
        if (!name) {
            google.accounts.id.prompt()
        }
    }, [])

    useEffect(() => {
        if(name!= "") {
            document.getElementById('signInDiv')!.hidden = true;
        }
    }, [name])



    return (
        <div className="Header">
            <Link to={'/'}><h1>StudiBetter</h1></Link>
            <div className="headerright">
                {name && 
                <Link to={`/${name}`}><h2> Sets</h2></Link>}
                <Link to={'/demo'}><h2> Demo</h2></Link>
                <div id="signInDiv"></div>
                {name &&
                 <div id="signedin">
                        <h3>{name}</h3>
                        <button onClick={(e) => handleSignOut(e)}>Sign Out </button>
                    </div>
                }
            </div>
        </div>

    )
}

export default Header