import "./style.css";

const Navbar = () => {
  return (
    <div className='container-nav glass'>

        <p>LOGO</p>

        <div id="btn-area">
            <button>Experimentar</button>
            <button>Entrar</button>
            <button className="btn-s">Cadastrar</button>
        </div>
    </div>
  )
}

export default Navbar