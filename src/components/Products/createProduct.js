import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"
export const ProductForm = () => {
    useEffect(
        () => {
        fetch("http://localhost:8088/productTypes")
        .then(response => response.json())
        .then(productsArray => setProductType(productsArray))
        },[]
    )
//add default properties for initial state
const [Product, setProductState] = useState({
    name: "",
    price: 0,
    productTypeId: 0,
    locationId: 0
})

const [ProductType, setProductType] = useState([])

const Navigate = useNavigate()

const localKandyUser = localStorage.getItem("kandy_user")
const KandyUserObject = JSON.parse(localKandyUser)

const handleSubmitButtonClick = (event) => {
    event.preventDefault();
  
    const productToSend = {
      userId: KandyUserObject.id,
      name: Product.name,
      price: parseInt(Product.price),
      productTypeId: parseInt(Product.productTypeId),
      locationId: parseInt(Product.locationId)
    };
  
    fetch("http://localhost:8088/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productToSend)
    })
      .then((response) => response.json())
      .then(() => {
        Navigate("/products");
      })
      .catch((error) => {
        console.error("Error submitting product:", error);
      });
  };
  

return (
    <form className="productForm">
        <h2 className="productForm__title">New product</h2>
        <fieldset name="product">
            <div className="form-group">
                <label htmlFor="name"> Product name:</label>
                <input
                    id="name"
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="name of product"
                    value={Product.name}
                    onChange={
                        (evt) => {
                            const copy = {...Product}
                            copy.name = evt.target.value
                            setProductState(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset name="price">
            <div className="form-group">
                <label htmlFor="price">price:</label>
                <input 
                    id="price"
                    type="text"
                    placeholder="price of product"
                    value={Product.price}
                    onChange={
                        (evt) => {
                            const copy = {...Product}
                            copy.price = evt.target.value
                            setProductState(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset name="location">
            <div className="form-group">
                <label htmlFor="location">locationId:</label>
                <input 
                    id="location"
                    type="text"
                    placeholder="location of product"
                    value={Product.locationId}
                    onChange={
                        (evt) => {
                            const copy = {...Product}
                            copy.locationId = evt.target.value
                            setProductState(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <select 
                 onChange={(evt) => {
                    const copy = {...Product}
                    copy.productTypeId = evt.target.value
                    setProductState(copy)
                }}>
                    <option value={0}>Select a candy type </option>
                    {ProductType.map((type) => (
                        <option key={type.id} value={type.id}> {type.category}</option>
                    ))}
                </select>
            </div>
        </fieldset>
        <button 
        onClick = {(clickEvent) => handleSubmitButtonClick(clickEvent)}
        className="btn btn-primary">
            Submit product
        </button>
    </form>
)

}
