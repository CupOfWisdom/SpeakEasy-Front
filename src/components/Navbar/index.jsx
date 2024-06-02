import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <div className='container-nav glass'>

        <Link to="/">LOGO</Link>

        <div id="btn-area">
            <button>Try it</button>
            <button>Login</button>
            <button className="btn-s">Sigin</button>
        </div>
    </div>
  )
}

export default Navbar