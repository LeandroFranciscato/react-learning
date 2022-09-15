import { TableCell, TableRow, TableSortLabel } from "@mui/material"

export function ProductTableHeader(props) {

    const order = props.order
    const orderDirection = props.orderDirection
    const onOrderChange = props.onOrderChange
    const onOrderDirectionChange = props.onOrderDirectionChange

    function handleOrderChange(e) {
        onOrderChange(e.target.id)
        if (e.target.id === order) {
            if (orderDirection === "asc") {
                onOrderDirectionChange("desc")
            } else {
                onOrderDirectionChange("asc")
            }
        } else {
            onOrderDirectionChange("asc")
        }
    }

    return (
        <TableRow>
            <TableCell>
                <TableSortLabel
                    id="name"
                    active={order === "name"}
                    direction={orderDirection}
                    onClick={handleOrderChange}>Name
                </TableSortLabel>
            </TableCell>

            <TableCell>
                <TableSortLabel
                    id="price"
                    active={order === "price"}
                    direction={orderDirection}
                    onClick={handleOrderChange}>Price ($)
                </TableSortLabel>
            </TableCell>
        </TableRow>
    )
}