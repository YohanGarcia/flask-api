import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand active" to="/" >Auto Pain</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/newcoche" >NewChoche</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/newpiesa" >NewPiesa</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/newcliente" >NewCliente</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/coche-cliente" >CocheCliente</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
