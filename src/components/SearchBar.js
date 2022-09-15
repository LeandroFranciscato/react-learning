
import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";

export function SearchBar(props) {
    const filterText = props.filterText
    const onlyInStock = props.onlyInStock
    const onFilterTextChange = props.onFilterTextChange
    const onOnlyInStockChange = props.onOnlyInStockChange

    return (
        <FormGroup>
            <TextField
                id="search_product"
                label="Search"
                variant="standard"
                value={filterText}
                onChange={e => onFilterTextChange(e.target.value)}
                autoComplete="false" />

            <br />

            <FormControlLabel
                control={<Checkbox
                    checked={onlyInStock}
                    onChange={e => onOnlyInStockChange(e.target.checked)} />}
                label="Only show products in stock" />

        </FormGroup>
    )
}