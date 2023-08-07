import { Link, useNavigate } from "react-router-dom"

export const CustomerNavBar = () => {
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)


    return <ul className="navbar">
        <li className="navbar__item navbar__locations">
            <Link className="navbar__link" to="/locations">
                view our locations!
            </Link>
        </li>

        <li className="navbar__item navbar__products">
            <Link className="navbar__link" to="/products">
                view our products!
            </Link>
        </li>

        <li className="navbar__item navbar__SearchProducts">
            <Link className="navbar__link" to="/productSearch">
                Find a candy
            </Link>
        </li>

        {
            localStorage.getItem("kandy_user")
                ? <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("kandy_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </li>
                : ""
        }
    </ul>
}