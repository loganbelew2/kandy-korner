import { useState } from "react"
import { SearchProducts } from "./SearchProducts.js"
import { ProductList } from "./products.js"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <SearchProducts setSearch={setSearchTerms} />
    <ProductList search={searchTerms} />
    </>
}