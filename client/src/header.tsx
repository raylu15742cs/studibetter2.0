import { Link } from "react-router-dom"
import { API_URL } from "./api/config"

function Header() {
    return (
        <div className="Header">
            <Link to={'/'}><h1>StudiBetter</h1></Link>
        </div>

    )
}

export default Header