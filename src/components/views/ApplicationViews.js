import {ProductForm} from "../Products/createProduct.js"
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations.js"
import {ProductList} from "../Products/products.js"
import { ProductContainer } from "../Products/ProductContainer.js"
import { EmployeeForm } from "../employees/EmployeeForm.js"
import { EmployeeList} from "../employees/EmployeeList.js"
import { CustomerList } from "../Customers/Customers.js"
import { CustomerDetails } from "../Customers/CustomerDetails.js"
import { useEffect, useState } from "react"


export const ApplicationViews = () => {

  //get customer state on initial render
  const [Customers, setCustomers] = useState([])
  useEffect(() => {
      fetch("http://localhost:8088/customers?_expand=user")
          .then(response => response.json())
          .then(data => setCustomers(data))
  }, []
  )

	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Your one-stop-shop to get all your candy desires</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />

				<Route path="productSearch" element={ <ProductContainer /> }/>
                <Route path = "products" element = {<ProductList />} />
				<Route path="CreateProduct" element= {<ProductForm />}/>
                <Route path="CreateEmployee" element = {<EmployeeForm/>}/>
                <Route path="Employees" element= {< EmployeeList/>}/>
                <Route path= "Customers" element= {< CustomerList customersProp = {Customers}/>}/>
                <Route path= "customerDetails/:{customerId}"element= {< CustomerDetails/>}/>
            </Route>
        </Routes>
    )
}
