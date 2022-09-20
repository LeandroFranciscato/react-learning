import { Table, TableBody } from "@mui/material";
import { useState } from "react";
import { GenTableFooter } from "./GenTableFooter";
import { GenTableHeader } from "./GenTableHeader";

export function GenTable(props) {

    let headerFields = [{ id: "name", name: "Name" }]
    headerFields = props.headerFields

    const useRequestData = props.useRequestData
    const prepareData = props.prepareData
    const getData = props.getData

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