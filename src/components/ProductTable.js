import { ProductCategoryRow } from "./ProductCategoryRow";
import { ProductRow } from "./ProductRow";

export function ProductTable(props) {

    props.data.sort((a, b) => {
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
    props.data.forEach((row, index) => {
        if (!props.filterOnlyInStock(row)) {
            return
        }
        if (!props.filterTextSearch(row)) {
            return
        }
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