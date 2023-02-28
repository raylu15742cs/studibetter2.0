import { Link } from "react-router-dom"
import { API_URL } from "./api/config"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"

function Header() {
    
    const [ user, setUser ] = useState<any>({})

    function handleSignOut(event:any) {
        setUser({})
        document.getElementById('signInDiv')!.hidden = false;
    }

    function handleCallbackResponse(response: any) {
        var userObject = jwtDecode(response.credential)
        console.log(userObject)
        setUser(userObject)
        document.getElementById('signInDiv')!.hidden = true;
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

        google.accounts.id.prompt()
    }, [])


    return (
        <div className="Header">
            <Link to={'/'}><h1>StudiBetter</h1></Link>
            <div className="headerright">
                <Link to={'/demo'}><h2> Demo</h2></Link>
                <div id="signInDiv"></div>
                { user.name &&
                    <div>
                        <h3>{user.name}</h3>
                        <button onClick={(e) => handleSignOut(e)}>Sign Out </button>
                    </div>

                }
            </div>
        </div>

    )
}

export default Header