import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { EmployeeNavBar } from "./EmployeeNav.js"
import { CustomerNavBar } from "./customerNav.js"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)
    
    return KandyUserObject.staff ? <EmployeeNavBar /> : <CustomerNavBar />;
   
    
}


