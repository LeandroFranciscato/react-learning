import { Table } from "@mui/material";
import { useState } from "react";
import { GenTableBody } from "./GenTableBody";
import { GenTableFooter } from "./GenTableFooter";
import { GenTableHeader } from "./GenTableHeader";

export function GenTable(props) {

    let headerFields = [{ id: "name", name: "Name" }]
    headerFields = props.headerFields

    const useRequestData = props.useRequestData
    const prepareData = props.prepareData
    const onAddBtnClicked = props.onAddBtnClicked
    const onBulkActionExecuted = props.onBulkActionExecuted
    const aditionalBulkActionMenus = props.aditionalBulkActionMenus

    const [filterText, setFilterText] = useState("")
    const [order, setOrder] = useState(headerFields[0].id)
    const [orderDirection, setOrderDirection] = useState("asc")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [showSelectColumn, setShowSelectColumn] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const { isLoading, error, data } = useRequestData(filterText, order, orderDirection, page, pageSize)

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
                data={data}
                onAddBtnClicked={onAddBtnClicked}
                onBulkActionExecuted={onBulkActionExecuted}
                aditionalBulkActionMenus={aditionalBulkActionMenus} />
            <GenTableBody
                isLoading={isLoading}
                error={error}
                data={data}
                prepareData={prepareData}
                showSelectColumn={showSelectColumn}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
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