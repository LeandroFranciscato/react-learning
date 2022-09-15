import { Container } from "@mui/material";
import { useState } from "react";
import { ProductTable } from "./ProductTable";
import { SearchBar } from "../search-bar/SearchBar";

export function FilterableProductTable() {

    const [filterText, setFilterText] = useState("")
    const [onlyInStock, setOnlyInStock] = useState(false)

    return (
        <Container>
            <SearchBar
                filterText={filterText}
                onlyInStock={onlyInStock}
                onFilterTextChange={val => setFilterText(val)}
                onOnlyInStockChange={val => setOnlyInStock(val)} />

            <ProductTable
                filterText={filterText}
                onlyInStock={onlyInStock} />
        </Container>
    )
}


