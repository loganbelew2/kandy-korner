import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const CustomerList = ({customersProp}) => {


    //list all customers with name and email
    return <ul>
        {
            customersProp.map((customer) => (
                <>
                    <li>
                        <Link to={`/customerDetails/${customer.id}`}>{customer.user.name}</Link>
                    </li>
                    <p>{customer.user.email}</p>
                </>
            ))
        }
    </ul>


}