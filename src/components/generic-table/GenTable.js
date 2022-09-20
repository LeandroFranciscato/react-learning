import { Checkbox, CircularProgress, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { GenTableFooter } from "./GenTableFooter";
import { GenTableHeader } from "./GenTableHeader";

export function GenTable(props) {

    let headerFields = [{ id: "name", name: "Name" }]
    headerFields = props.headerFields

    const useRequestData = props.useRequestData
    const prepareData = props.prepareData

    const [filterText, setFilterText] = useState("")
    const [order, setOrder] = useState(headerFields[0].id)
    const [orderDirection, setOrderDirection] = useState("asc")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [showSelectColumn, setShowSelectColumn] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

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

    const { isLoading, error, data } = useRequestData(filterText, order, orderDirection, page, pageSize)

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
        <Table>
            <GenTableHeader
                filterText={filterText}
                onFilterTextChange={val => setFilterText(val)}
                order={order}
                orderDirection={orderDirection}
                onOrderChange={val => setOrder(val)}
                onOrderDirectionChange={val => setOrderDirection(val)}
                fields={headerFields}
                showSelectColumn={showSelectColumn}
                setShowSelectColumn={val => setShowSelectColumn(val)}
                selectedRows={selectedRows}
                setSelectedRows={val => setSelectedRows(val)}
                data={data} />
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
            {!isLoading && !error &&
                <GenTableFooter
                    count={data.count}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={val => setPage(val)}
                    onPageSizeChange={val => setPageSize(val)} />
            }
        </Table>
    )
}