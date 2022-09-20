
import { Add, Delete, Edit, Send } from "@mui/icons-material";
import { Button, Checkbox, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GenTable } from "../generic-table/GenTable";

export function UserTable(props) {

    const filterText = props.filterText

    const [toggleHideSelectList, setToogleHideSelectList] = useState(true)
    const [bulkActionSelected, setBulkActionSelected] = useState("")
    const [selectedRows, setSelectedRows] = useState([])
    const [allRowsSelected, setAllRowsSelected] = useState(false)

    const headerFields = [
        {
            id: "",
            name: "Select All",
            hidden: toggleHideSelectList,
            element: (
                <Checkbox
                    checked={allRowsSelected}
                    onChange={handleSelectAllRows}
                    title="This field marks the rows appearing on the screen, increase the 'Rows per page' in the bottom of the page if needed"
                />
            )
        },
        { id: "id", name: "ID" },
        { id: "title", name: "Title" },
        { id: "userId", name: "User ID" },
        { id: "", name: "Actions" }
    ]

    function useRequestData(order, orderDirection, page, pageSize) {
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

    let currentData = {}
    function prepareData(data) {
        currentData = data
        let rows = []
        data.data.forEach((row, index) => {
            rows.push(
                <TableRow
                    key={index}>
                    {!toggleHideSelectList &&
                        <TableCell>
                            <Checkbox
                                checked={(selectedRows.includes(row.id))}
                                onChange={e => handleSelectRow(e, row.id)} />
                        </TableCell>
                    }
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>
                        <IconButton>
                            <Edit />
                        </IconButton>
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
        return rows
    }

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

    function handleSelectAllRows(e) {
        let checked = e.target.checked
        setAllRowsSelected(checked)
        if (!checked) {
            setSelectedRows([])
        } else {
            let selectedRows = []
            currentData.data.forEach((row,) => {
                selectedRows.push(row.id)
            })
            setSelectedRows(selectedRows)

        }
    }

    function onBulkActionSelect(e) {
        if (e.target.value === "") {
            setToogleHideSelectList(true)
            setSelectedRows([])
            setAllRowsSelected(false)
        } else {
            setToogleHideSelectList(false)
        }
        setBulkActionSelected(e.target.value)
    }

    return (
        <>
            <Stack direction="row" spacing={2} >
                <Button variant="outlined"
                    startIcon={<Add />}>
                    Add
                </Button>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="select-bulk-actions">Bulk Actions</InputLabel>
                    <Select
                        labelId="select-bulk-actions"
                        id="bulk-actions"
                        label="Bulk Actions"
                        value={bulkActionSelected}
                        onChange={onBulkActionSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="delete">Delete</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    startIcon={<Send />}
                    disabled={selectedRows.length === 0 || bulkActionSelected === ""} />
            </Stack>

            <GenTable
                headerFields={headerFields}
                useRequestData={useRequestData}
                prepareData={prepareData}
            />
        </>
    )
}
