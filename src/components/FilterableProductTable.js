import { useState } from "react";
import { ProductTable } from "./ProductTable";
import { SearchBar } from "./SearchBar";

export function FilterableProductTable() {

    const [filterText, setFilterText] = useState("")
    const [onlyInStock, setOnlyInStock] = useState(false)

    var data = getData()

    return (
        <>
            <SearchBar
                filterText={filterText}
                onlyInStock={onlyInStock}
                onFilterTextChange={val => setFilterText(val)}
                onOnlyInStockChange={val => setOnlyInStock(val)} />

            <ProductTable
                data={data}
                filterOnlyInStock={(row) => filterOnlyInStock(row, onlyInStock)}
                filterTextSearch={(row) => filterTextSearch(row, filterText)}
            />
        </>
    )
}

function filterTextSearch(row, text) {
    return row.category.includes(text) ||
        row.price.includes(text) ||
        row.name.includes(text)
}

function filterOnlyInStock(row, onlyInStock) {
    if (onlyInStock === false) {
        return true
    }
    return row.stocked === onlyInStock
}

function getData() {
    return [
        { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
        { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
        { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
        { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
        { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
        { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    ];
}

