import { Checkbox, CircularProgress, TableBody, TableCell, TableRow } from "@mui/material";

export function GenTableBody(props) {

    const isLoading = props.isLoading
    const error = props.error
    const data = props.data
    const prepareData = props.prepareData
    const showSelectColumn = props.showSelectColumn
    const selectedRows = props.selectedRows
    const setSelectedRows = props.setSelectedRows

    function handleSelectRow(e, rowId) {
        if (!e.target.checked) {
            var newSelectedRows = selectedRows.filter(m => {
                return (m !== rowId);
            });
            setSelectedRows(newSelectedRows)
        } else {
            setSelectedRows([...selectedRows, rowId])
        }
    }

    const bodyRowCells = prepareData(data ? data : { data: [], count: 0 })
    let bodyRows = []
    bodyRowCells.forEach((cells, index) => {
        bodyRows.push(
            <TableRow key={index}>
                {showSelectColumn &&
                    <TableCell>
                        <Checkbox
                            checked={(selectedRows.includes(data.data[index].id))}
                            onChange={e => handleSelectRow(e, data.data[index].id)} />
                    </TableCell>
                }
                {cells}
            </TableRow>
        )
    })

    return (
        <TableBody>
            {isLoading &&
                <TableRow>
                    <TableCell colSpan={12} align="center">
                        <CircularProgress />
                    </TableCell>
                </TableRow>}
            {error &&
                <TableRow>
                    <TableCell colSpan={12} align="center">
                        'An error has occurred: ' {error.message}
                    </TableCell>
                </TableRow>
            }
            {bodyRows}
        </TableBody>
    )
}