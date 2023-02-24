import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import jwtDecode from "jwt-decode"
import { API_URL } from "./api/config"

function Header() {
    const [user, setUser] = useState<any>({})
    const [signedIn, setSignedIn] = useState(true)

    function handleCallbackResponse(response: any) {
        var userObject = jwtDecode(response.credential)
        setUser(userObject)
        setSignedIn(false)
    }

    async function handleSignOut(event:any) {
        setUser({})
        setSignedIn(true)

    }

    useEffect(() => {
        // global google
        google.accounts!.id.initialize({
            client_id: "141557847771-abp13s9u5nubb1safoqorsom646s0ka0.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        })
        google.accounts.id.renderButton(
            document.getElementById('signInDiv') as HTMLDivElement,
            {
                theme: "outline", size: "large",
                type: "standard"
            }
        )

        google.accounts.id.prompt();
    }, [])

    //
    return (
        <div className="Header">
            <Link to={'/'}><h1>StudiBetter</h1></Link>
            <div className="headerright">
                <div >
                    <Link to={'/demo'}><h2> Demo</h2></Link>
                </div>
                <div>
                    { signedIn == true ?
                         <div id="signInDiv"></div>
                         : <div>
                                <p>{user.name}</p>
                                <button onClick={(e) => handleSignOut(e)}>Signout</button>
                            </div>
                    }
                </div>
            </div>

        </div>

    )
}

export default Header