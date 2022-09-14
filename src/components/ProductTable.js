import { useQuery } from "@tanstack/react-query";
import { ProductCategoryRow } from "./ProductCategoryRow";
import { ProductRow } from "./ProductRow";

export function ProductTable(props) {

    const { isLoading, error, data } = useQuery(['useProductData', props.filterText, props.onlyInStock], () => {

        const filterText = props.filterText
        const onlyInStock = props.onlyInStock

        var array = [
            { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
            { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
            { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
            { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
            { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
            { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
        ]

        function filterTextSearch(row) {
            return row.category.includes(filterText) ||
                row.price.includes(filterText) ||
                row.name.includes(filterText)
        }

        function filterOnlyInStock(row) {
            if (onlyInStock === false) {
                return true
            }
            return row.stocked === onlyInStock
        }

        var filteredArray = []
        array.forEach((row) => {
            if (filterTextSearch(row) && filterOnlyInStock(row)) {
                return filteredArray.push(row)
            }
        })

        return filteredArray
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    data.sort((a, b) => {
        if (a.category > b.category) {
            return 1
        }
        if (a.category < b.category) {
            return -1
        }
        return 0
    })

    let rows = []
    let currentCategory = undefined
    data.forEach((row, index) => {
        if (currentCategory !== row.category) {
            rows.push(
                <ProductCategoryRow
                    key={row.category}
                    value={row.category} />
            )
        }
        rows.push(
            <ProductRow
                key={index}
                name={row.name}
                price={row.price}
                stocked={row.stocked} />
        )
        currentCategory = row.category
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price ($)</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}