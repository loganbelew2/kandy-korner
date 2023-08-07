import { Link, useNavigate } from "react-router-dom"

export const EmployeeNavBar = () => {
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)


    return <ul className="navbar">
        <li className="navbar__item navbar__locations">
            <Link className="navbar__link" to="/locations">
                view our locations!
            </Link>
        </li>
        {
            <li className="navbar__item navbar__products">
                <Link className="navbar__link" to="/products">
                    view our products!
                </Link>
            </li>
        }
        {
            <li className="navbar__item navbar__createProduct">
                <Link  className= "navbar__link" to="/CreateProduct">
                    Create a Product
                </Link>
            </li>
        }
        {
            <li className="navbar__item navbar__createEmployee">
                <Link  className= "navbar__link" to="/CreateEmployee">
                    Create a Employee
                </Link>
            </li>
        }
        {
            <li className="navbar__item navbar__employees">
                <Link  className= "navbar__link" to="/Employees">
                    Employees
                </Link>
            </li>
        }
        {
            <li className="navbar__item navbar__customers">
                <Link  className= "navbar__link" to="/Customers">
                    Customers
                </Link>
            </li>
        }
      

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