import { Link } from "react-router-dom"
import { API_URL } from "./api/config"

function Header() {
    return (
        <div className="Header">
            <Link to={'/'}><h1>StudiBetter</h1></Link>
            <div className="headerright">
                <Link to={'/'}><h2> Demo </h2></Link>
                <Link to={'/'}><h2> Login</h2></Link>
            </div>
        </div>

    )
}

export default Header