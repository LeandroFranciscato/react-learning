
var nameColumn = "Name ↓"
var priceColumn = "Price ($)"

export function ProductTableHeader(props) {

    const order = props.order
    const orderDirection = props.orderDirection

    var currentOrder = order
    function handleOrderChange(e) {
        if (currentOrder === e.target.id) {
            if (orderDirection === "asc") {
                props.onOrderDirectionChange("desc")
            } else {
                props.onOrderDirectionChange("asc")
            }
        } else {
            props.onOrderChange(e.target.id)
            props.onOrderDirectionChange("asc")
        }
    }

    function handleNameColumnChange() {
        if (nameColumn === "Name ↓") {
            nameColumn = "Name ↑"
        } else {
            nameColumn = "Name ↓"
        }
        priceColumn = "Price ($)"
    }

    function handlePriceColumnChange() {
        if (priceColumn === "Price ($) ↓") {
            priceColumn = "Price ($) ↑"
        } else {
            priceColumn = "Price ($) ↓"
        }
        nameColumn = "Name"
    }

    return (
        <tr>
            <th id="name" onClick={e => { handleNameColumnChange(); handleOrderChange(e); }}>{nameColumn}</th>
            <th id="price" onClick={e => { handlePriceColumnChange(); handleOrderChange(e); }}>{priceColumn}</th>
        </tr>
    )
}