
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GenTable } from "../generic-table/GenTable";
import { UserForm } from "./UserForm";

export function UserTable() {

    const [modalOpened, setModalOpened] = useState(false)
    const [formEditingID, setFormEditingID] = useState(0)

    const headerFields = [
        { id: "id", name: "ID" },
        { id: "title", name: "Title" },
        { id: "userId", name: "User ID" },
        { id: "", name: "Actions" }
    ]

    function useRequestData(filterText, order, orderDirection, page, pageSize) {
        return useQuery(['useUserData', filterText, order, orderDirection, page, pageSize], async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            const array = await res.json();

            function filterTextSearch(row) {
                return row.id.toString().includes(filterText) ||
                    row.title.includes(filterText) ||
                    row.userId.toString().includes(filterText);
            }

            var filteredArray = [];
            array.forEach((row_1) => {
                if (filterTextSearch(row_1)) {
                    return filteredArray.push(row_1);
                }
            });

            if (orderDirection === "asc") {
                filteredArray.sort((a, b) => {
                    if (a[order] > b[order]) {
                        return 1;
                    }
                    if (a[order] < b[order]) {
                        return -1;
                    }
                    return 0;
                });
            } else if (orderDirection === "desc") {
                filteredArray.sort((a_1, b_1) => {
                    if (a_1[order] > b_1[order]) {
                        return -1;
                    }
                    if (a_1[order] < b_1[order]) {
                        return 1;
                    }
                    return 0;
                });
            }

            let data = { data: [], count: 0 };
            data.data = filteredArray.slice((page - 1) * pageSize, page * pageSize);
            data.count = filteredArray.length;
            return data;
        })
    }

    function prepareData(data) {
        let rowsCells = []
        data.data.forEach((row, index) => {
            rowsCells.push(
                <>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => onEditBtnClicked(row.id)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDeleteBtnClicked(row.id)}>
                            <Delete />
                        </IconButton>
                    </TableCell>
                </>
            )
        })
        return rowsCells
    }

    function onEditBtnClicked(rowId) {
        setFormEditingID(rowId)
        setModalOpened(true)
    }

    function onDeleteBtnClicked(rowId) {
        console.log("delete", rowId)
    }

    function onAddBtnClicked() {
        setFormEditingID(0)
        setModalOpened(true)
    }

    const aditionalBulkActionMenus = ([])

    function onBulkActionExecuted(bulkActionSelected, selectedRows) {
        console.log(bulkActionSelected)
        console.log(selectedRows)
    }

    return (
        <>
            <GenTable
                headerFields={headerFields}
                useRequestData={useRequestData}
                prepareData={prepareData}
                onAddBtnClicked={onAddBtnClicked}
                onBulkActionExecuted={onBulkActionExecuted}
                aditionalBulkActionMenus={aditionalBulkActionMenus}
            />

            <UserForm
                open={modalOpened}
                setOpen={setModalOpened}
                editingID={formEditingID} />
        </>
    )
}
