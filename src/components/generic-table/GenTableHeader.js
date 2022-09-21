import { Add, Check } from "@mui/icons-material"
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select, Stack, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useState } from "react"
import { SearchBar } from "../search-bar/SearchBar"

export function GenTableHeader(props) {

    const {
        filterText,
        onFilterTextChange,
        order,
        orderDirection,
        onOrderChange,
        onOrderDirectionChange,
        showSelectColumn,
        setShowSelectColumn,
        selectedRows,
        setSelectedRows,
        data,
        onAddBtnClicked,
        onBulkActionExecuted,
        aditionalBulkActionMenus
    } = props

    var fields = [{ id: "", name: "" }]
    fields = props.fields

    const [bulkActionSelected, setBulkActionSelected] = useState("")
    const [allRowsSelected, setAllRowsSelected] = useState(false)

    let cells = [
        (showSelectColumn &&
            <TableCell key="select-all-checkbox">
                <Checkbox
                    checked={allRowsSelected}
                    onChange={handleSelectAllRows}
                    title='This field marks the rows appearing on the screen, increase the "Rows per page" in the bottom of the page if needed'
                />
            </TableCell>
        )
    ]
    fields.forEach((field, index) => {
        cells.push(
            <TableCell key={index}>

                {field.id &&
                    <TableSortLabel
                        id={field.id}
                        active={order === field.id}
                        direction={orderDirection}
                        onClick={handleOrderChange}>{field.name}
                    </TableSortLabel>
                }

                {!field.id &&
                    (field.name)
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

    function onBulkActionSelect(e) {
        if (e.target.value === "") {
            setShowSelectColumn(false)
            setSelectedRows([])
            setAllRowsSelected(false)
        } else {
            setShowSelectColumn(true)
        }
        setBulkActionSelected(e.target.value)
    }

    function handleSelectAllRows(e) {
        let checked = e.target.checked
        setAllRowsSelected(checked)
        if (!checked) {
            setSelectedRows([])
        } else {
            let selectedRows = []
            data.data.forEach((row,) => {
                selectedRows.push(row.id)
            })
            setSelectedRows(selectedRows)
        }
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={12}>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={onAddBtnClicked}>
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
                                {aditionalBulkActionMenus}
                            </Select>
                        </FormControl>

                        <Button
                            variant="outlined"
                            disabled={selectedRows.length === 0 || bulkActionSelected === ""}
                            onClick={e => onBulkActionExecuted(bulkActionSelected, selectedRows)}>
                            <Check />
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={12}>
                    <SearchBar
                        filterText={filterText}
                        onFilterTextChange={val => onFilterTextChange(val)} />
                </TableCell>
            </TableRow>

            <TableRow>
                {cells}
            </TableRow>
        </TableHead>
    )
}