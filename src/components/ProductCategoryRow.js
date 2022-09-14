import { ProductRow } from "./ProductRow";

export function ProductCategoryRow(props) {
    const category = props.category
    const products = props.data


    let rows = []
    products.forEach((product, index) => {
        if (category === product.category) {
            rows.push(
                <ProductRow
                    key={index}
                    name={product.name}
                    price={product.price}
                    stocked={product.stocked} />
            )
        }
    })

    return (
        <>
            <tr>
                <th>{category}</th>
            </tr>
            {rows}
        </>
    )
}
