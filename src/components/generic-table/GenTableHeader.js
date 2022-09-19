import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"

export function GenTableHeader(props) {

    var fields = [{ id: "", name: "" }]
    fields = props.fields

    const order = props.order
    const orderDirection = props.orderDirection
    const onOrderChange = props.onOrderChange
    const onOrderDirectionChange = props.onOrderDirectionChange

    let cells = []
    fields.forEach((field, index) => {
        cells.push(
            <TableCell
                key={index}>
                {field.id &&
                    <TableSortLabel
                        id={field.id}
                        active={order === field.id}
                        direction={orderDirection}
                        onClick={handleOrderChange}>{field.name}
                    </TableSortLabel>
                }
                {!field.id &&
                    <TableRow>
                        {field.name}
                    </TableRow>
                }
            </TableCell>
        )
    })

    function handleOrderChange(e) {
        if (!e.target.id) return
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
        <>

            <TableHead>
                <TableRow>
                    {cells}
                </TableRow>
            </TableHead>
        </>
    )
}