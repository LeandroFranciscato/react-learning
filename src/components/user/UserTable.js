
import { Delete, Edit } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TableCell, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GenTable } from "../generic-table/GenTable";


export function UserTable() {

    const [addDialogOpened, setAddDialogOpened] = useState(false)
    const [formErrorAlert, setFormErrorAlert] = useState("")
    const [formValues, setFormValues] = useState({ id: "", name: "", userId: "" })

    function handleSetFormValues(e) {
        let auxValues = { ...formValues }
        auxValues[e.target.name] = e.target.value
        setFormValues(auxValues)
    }

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
        console.log("edit", rowId)
    }

    function onDeleteBtnClicked(rowId) {
        console.log("delete", rowId)
    }

    function onAddBtnClicked() {
        setAddDialogOpened(true)
    }

    function onSaveBtnClicked() {
        console.log(formValues)
        setFormErrorAlert(true)
    }

    const aditionalBulkActionMenus = ([
        <MenuItem key={"outra-acao-menu"} value="outra-acao">Outra Ação</MenuItem>,
        <MenuItem key={"outra-acao2-menu"} value="outra-acao2">Outra Ação2</MenuItem>
    ])

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


            <Dialog open={addDialogOpened} onClose={() => setAddDialogOpened(false)}>
                <DialogTitle>New User</DialogTitle>
                <DialogContent>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            {formErrorAlert &&
                                <Alert severity="error" onClose={() => setFormErrorAlert(false)}>
                                    Deu pau ai
                                </Alert>
                            }
                        </Grid>


                        <Grid item xs={2}>
                            <TextField
                                name="id"
                                variant="outlined"
                                label="ID"
                                type="number"
                                required
                                value={formValues.id}
                                onChange={handleSetFormValues}
                            ></TextField>
                        </Grid>


                        <Grid item xs={8}>
                            <TextField
                                name="name"
                                fullWidth
                                variant="outlined"
                                label="Name"
                                type="text"
                                required
                                value={formValues.name}
                                onChange={handleSetFormValues}>
                            </TextField>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                name="userId"
                                variant="outlined"
                                label="User"
                                type="number"
                                required
                                value={formValues.userId}
                                onChange={handleSetFormValues}>
                            </TextField>
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpened(false)}>Cancel</Button>
                    <Button onClick={() => onSaveBtnClicked()}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
