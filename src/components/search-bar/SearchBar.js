
import { FormControl, TextField } from "@mui/material";

export function SearchBar(props) {

    const { filterText, onFilterTextChange } = props

    return (
        <FormControl fullWidth>
            <TextField
                id="search_bar"
                label="Search"
                variant="outlined"
                value={filterText}
                onChange={e => onFilterTextChange(e.target.value)}
                autoComplete="false" />
        </FormControl>
    )
}