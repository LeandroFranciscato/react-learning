import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"

export function GenTableHeader(props) {

    var fields = [{ id: "", name: "", hidden: false, element: (<></>) }]
    fields = props.fields

    const order = props.order
    const orderDirection = props.orderDirection
    const onOrderChange = props.onOrderChange
    const onOrderDirectionChange = props.onOrderDirectionChange

    let cells = []
    fields.forEach((field, index) => {
        if (!field.hidden) {
            cells.push(
                <TableCell key={index}>

                    {field.element &&
                        (field.element)
                    }

                    {!field.element && field.id &&
                        <TableSortLabel
                            id={field.id}
                            active={order === field.id}
                            direction={orderDirection}
                            onClick={handleOrderChange}>{field.name}
                        </TableSortLabel>
                    }

                    {!field.element && !field.id &&
                        (field.name)
                    }
                </TableCell>
            )
        }
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