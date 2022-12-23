import { Link } from "react-router-dom"
import { API_URL } from "./api/config"

function Header() {
    return (
        <div className="Header">
            <Link to={'/'}><h1>StudiBetter</h1></Link>
            <div>
                <h1>Demo</h1>
                <h1>Login</h1>
            </div>
        </div>

    )
}

export default Header