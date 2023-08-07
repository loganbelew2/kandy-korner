import { useEffect, useState } from "react";
import "./products.css";
import { Link } from "react-router-dom";

export const ProductList = ({search}) => {
  // Declare initial product state
  const [products, setProductState] = useState([]);
  const [expensiveProducts, setExpensiveState] = useState(false);
  const [filteredProducts, setFilteredState] = useState([]);
  
  // Get the user object
  const localKandyUser = localStorage.getItem("kandy_user");
  const KandyUserObject = JSON.parse(localKandyUser);


    useEffect(() => {
        if (search) {
          const filtered = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );
          setFilteredState(filtered);
        } else {
          setFilteredState(products);
        }
      }, [search, products]);
      

  // Fetch products and update initial product state
  useEffect(() => {
    fetch("http://localhost:8088/products?_sort=name&_expand=productType&_expand=location")
      .then(response => response.json())
      .then(productsArray => setProductState(productsArray));
  }, []);

  // Update filtered products when the products state changes
  useEffect(() => {
    setFilteredState(products);
  }, [products]);

  // Filter products based on expensive state and user role
  useEffect(() => {
    const filtered = expensiveProducts && KandyUserObject.staff
      ? products.filter(p => p.price >= 2)
      : products;
    setFilteredState(filtered);
  }, [expensiveProducts, products, KandyUserObject.staff]);

  // Group products by category
  const groupedProducts = {};
  filteredProducts.forEach(p => {
    if (!groupedProducts[p.productType.category]) {
      groupedProducts[p.productType.category] = [];
    }
    groupedProducts[p.productType.category].push(p);
  });

  // Display product state to user (employee)
  return (
    <>
      {KandyUserObject.staff && (
        <>
          <button className="expensiveButton" onClick={() => setExpensiveState(true)}>show expensive candy</button>
          <button className="expensiveButton" onClick={() => setExpensiveState(false)}>show all candy</button>
        </>
      )}

      <div className="products">
  <h2>Our products</h2>
  {search && filteredProducts.length === 0 ? (
    <div>No matching products found.</div>
  ) : (
    Object.entries(groupedProducts).map(([category, products]) => (
      <section key={category}>
        <h3>{category}</h3>
        {products.map(p => (
          <div className="product" key={p.id}>
            {search ? (
              <>
                <div>{p.name} <Link onClick={() => window.alert(` find this product at: ${p.location.address}`)}
                  >Show Me where</Link></div>
                <div>{p.price}$ </div>
              </>
            ) : (
              <>
                {p.name} : {p.price}$
                <div>{p.productType.category}</div>
              </>
            )}
          </div>
        ))}
      </section>
    ))
  )}
</div>

      
    </>
  );
};
