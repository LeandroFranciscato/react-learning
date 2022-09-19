import { Add, Send } from "@mui/icons-material";
import { Button, MenuItem, Select, Table, TableBody } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { GenTableFooter } from "./GenTableFooter";
import { GenTableHeader } from "./GenTableHeader";

export function GenTable(props) {

    let headerFields = [{ id: "name", name: "Name" }]
    headerFields = props.headerFields

    const useRequestData = props.useRequestData
    const prepareData = props.prepareData

    const [order, setOrder] = useState(headerFields[0].id)
    const [orderDirection, setOrderDirection] = useState("asc")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { isLoading, error, data } = useRequestData(order, orderDirection, page, pageSize)

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const bodyRows = prepareData(data)

    return (
        <>
            <Stack direction="row" spacing={2} >
                <Button variant="outlined" startIcon={<Add />}>
                    Add
                </Button>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"actions"}
                    label="Age"
                    onChange={e => { }}
                >
                    <MenuItem value={"actions"} disabled={true}>Bulk Actions</MenuItem>
                    <MenuItem value={"delete"}>Delete</MenuItem>
                </Select>
                <Button variant="outlined" startIcon={<Send />} disabled={true} />
            </Stack>

            <Table>
                <GenTableHeader
                    order={order}
                    orderDirection={orderDirection}
                    onOrderChange={val => setOrder(val)}
                    onOrderDirectionChange={val => setOrderDirection(val)}
                    fields={headerFields} />
                <TableBody>
                    {bodyRows}
                </TableBody>
                <GenTableFooter
                    count={data.count}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={val => setPage(val)}
                    onPageSizeChange={val => setPageSize(val)} />
            </Table>
        </>
    )
}